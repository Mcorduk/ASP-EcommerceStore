using API.Data;
using API.Entities;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Components.Web;

namespace API.Controllers
{
    public class CartController : BaseApiController
    {
        private readonly StoreContext _context;
        public CartController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetCart")]
        public async Task<ActionResult<CartDTO>> GetCart()
        {
            var cart = await RetrieveCart();

            if (cart == null) return NotFound();

            return MapCartToDTO(cart);
        }



        [HttpPost] //api/cart?productId=1&quantity=2
        public async Task<ActionResult<CartDTO>> AddItemToCart(int productId, int quantity)
        {
            var product = await _context.Products.FindAsync(productId);

            if (product == null) return BadRequest(new ProblemDetails { Title = "Product not found" });

            var cart = await RetrieveCart();

            if (cart == null) cart = CreateCart();

            cart.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest("Failed to add item to cart");

            var CartDTO = MapCartToDTO(cart);

            return CreatedAtRoute("GetCart", CartDTO);
        }

        [HttpDelete]
        public async Task<ActionResult<Cart>> RemoveFromCart(int productId, int quantity)
        {
            var cart = await RetrieveCart();

            if (cart == null) return NotFound();

            var cartItem = cart.Items.FirstOrDefault(x => x.ProductId == productId);

            if (cartItem == null) return NotFound();

            cartItem.Quantity -= quantity;

            if (cartItem.Quantity <= 0)
            {
                cart.Items.Remove(cartItem);
            }

            await _context.SaveChangesAsync();

            return Ok();
        }

        /* Helper Methods */

        private async Task<Cart> RetrieveCart()
        {
            return await _context.Carts
            .Include(x => x.Items)
            .ThenInclude(x => x.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private Cart CreateCart()
        {
            var cart = new Cart
            {
                BuyerId = Guid.NewGuid().ToString()
            };

            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30)
            };

            Response.Cookies.Append("buyerId", cart.BuyerId, cookieOptions);

            _context.Carts.Add(cart);
            return cart;
        }

        private static ActionResult<CartDTO> MapCartToDTO(Cart cart)
        {
            return new CartDTO
            {
                Id = cart.Id,
                BuyerId = cart.BuyerId,
                Items = cart.Items.Select(x => new CartItemDTO
                {
                    ProductId = x.ProductId,
                    Name = x.Product.Name,
                    Price = x.Product.Price,
                    PictureUrl = x.Product.PictureUrl,
                    Quantity = x.Quantity,
                    Brand = x.Product.Brand,
                    Type = x.Product.Type
                }).ToList()
            };
        }

    }
}