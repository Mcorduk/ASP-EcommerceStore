using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace API.Entities
{
    public class Cart
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<CartItem> Items { get; set; } = new List<CartItem>();

        public void AddItem(Product product, int quantity)
        {
            if (Items.Any(item => item.Product.Id == product.Id))
            {
                Items.Find(item => item.Product.Id == product.Id).Quantity += quantity;
            }
            else
            {
                Items.Add(new CartItem
                {
                    Product = product,
                    Quantity = quantity
                });
            }
        }

        public void RemoveItem(int productId, int quantity = 1)
        {
            var item = Items.FirstOrDefault(item => item.Product.Id == productId);
            if (item != null)
            {
                item.Quantity -= quantity;

                if (item.Quantity <= 0)
                {
                    Items.Remove(item);
                }
            }
        }
    }
}