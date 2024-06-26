using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DBInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)
        {

            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "user",
                    Email = "user@test.com"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@test.com"
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] { "Member", "Admin" });
            }
            if (context.Products.Any()) return;

            var products = new List<Product> {
                new Product
                {
                    Name = "Sanrio My Melody kids shoulder bag",
                    Description = "A cute and practical shoulder bag for kids featuring My Melody.",
                    Price = 1500,
                    PictureUrl = "/images/products/bag-mymelody.png",
                    Brand = "Sanrio",
                    Type = "Bag",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Jellycat Keychain",
                    Description = "A charming keychain featuring a Jellycat design.",
                    Price = 500,
                    PictureUrl = "/images/products/keychain-jellycat.png",
                    Brand = "Jellycat",
                    Type = "Keychain",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Jellycat rose dragon plush",
                    Description = "A soft and cuddly rose dragon plush from Jellycat.",
                    Price = 2000,
                    PictureUrl = "/images/products/plush-rosedragon.png",
                    Brand = "Jellycat",
                    Type = "Plush",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Jellycat Watermelon Plush Bag",
                    Description = "A fun and fruity watermelon plush bag from Jellycat.",
                    Price = 1800,
                    PictureUrl = "/images/products/bag-watermelon.png",
                    Brand = "Jellycat",
                    Type = "Bag",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Sanrio Hello Kitty Cushion Pillow",
                    Description = "A comfortable and cute Hello Kitty cushion pillow from Sanrio.",
                    Price = 1200,
                    PictureUrl = "/images/products/pillow-hellokitty.png",
                    Brand = "Sanrio",
                    Type = "Plush",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Junie Banana Keychain Squishmallow",
                    Description = "A squishy and cute Junie Banana keychain from Squishmallow.",
                    Price = 600,
                    PictureUrl = "/images/products/keychain-juniebanana.png",
                    Brand = "Squishmallow",
                    Type = "Keychain",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Skeleton Kuromi Squishmallow",
                    Description = "A spooky and squishy Skeleton Kuromi from Squishmallow.",
                    Price = 2500,
                    PictureUrl = "/images/products/plush-kuromi.png",
                    Brand = "Squishmallow",
                    Type = "Plush",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "My Melody Squishmallow",
                    Description = "A squishy and cute My Melody from Squishmallow.",
                    Price = 2500,
                    PictureUrl = "/images/products/plush-mymelody.png",
                    Brand = "Squishmallow",
                    Type = "Plush",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Pusheen Plush",
                    Description = "A soft and cuddly Pusheen plush from GUND.",
                    Price = 2000,
                    PictureUrl = "/images/products/plush-pusheen.png",
                    Brand = "GUND",
                    Type = "Plush",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Pusheen bedroom slippers",
                    Description = "Cozy and cute Pusheen bedroom slippers from GUND.",
                    Price = 1500,
                    PictureUrl = "/images/products/slippers-pusheen.png",
                    Brand = "GUND",
                    Type = "Slippers",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Sanrio My Melody bedroom slippers",
                    Description = "Cozy and cute My Melody bedroom slippers from Sanrio.",
                    Price = 1500,
                    PictureUrl = "/images/products/slippers-mymelody.png",
                    Brand = "Sanrio",
                    Type = "Slippers",
                    QuantityInStock = 100
                },new Product
                {
                    Name = "Sanrio Cinnamoroll Plush",
                    Description = "A soft and cuddly Cinnamoroll plush from Sanrio.",
                    Price = 2000,
                    PictureUrl = "/images/products/plush-cinnamoroll.png",
                    Brand = "Sanrio",
                    Type = "Plush",
                    QuantityInStock = 100
                },new Product
                {
                    Name = "Rilakkuma Plush",
                    Description = "A soft and cuddly Rilakkuma plush.",
                    Price = 2000,
                    PictureUrl = "/images/products/plush-rilakkuma.png",
                    Brand = "Rilakkuma",
                    Type = "Plush",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Rilakkuma Streetwear Plush Keychain",
                    Description = "A stylish Rilakkuma streetwear plush keychain.",
                    Price = 600,
                    PictureUrl = "/images/products/keychain-rilakkuma.png",
                    Brand = "Rilakkuma",
                    Type = "Keychain",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Pusheen Backpack",
                    Description = "A practical and cute Pusheen backpack.",
                    Price = 2500,
                    PictureUrl = "/images/products/backpack-pusheen.png",
                    Brand = "Pusheen",
                    Type = "Backpack",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Pusheen Squishy Keychain",
                    Description = "A squishy and cute Pusheen keychain.",
                    Price = 600,
                    PictureUrl = "/images/products/keychain-pusheen.png",
                    Brand = "Pusheen",
                    Type = "Keychain",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Rilakkuma Cushion Plush",
                    Description = "A soft and cuddly Rilakkuma cushion plush.",
                    Price = 2200,
                    PictureUrl = "/images/products/cushion-rilakkuma.png",
                    Brand = "Rilakkuma",
                    Type = "Plush",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Sanrio Pompompurin Keychain",
                    Description = "A cute Pompompurin keychain from Sanrio.",
                    Price = 600,
                    PictureUrl = "/images/products/keychain-pompompurin.png",
                    Brand = "Sanrio",
                    Type = "Keychain",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Aurora Rainbow Plush",
                    Description = "A colorful and cuddly rainbow plush from Aurora.",
                    Price = 2000,
                    PictureUrl = "/images/products/plush-rainbow.png",
                    Brand = "Aurora",
                    Type = "Plush",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Aurora Strawberry Cow Plush",
                    Description = "A cute and cuddly strawberry cow plush from Aurora.",
                    Price = 2000,
                    PictureUrl = "/images/products/plush-strawberrycow.png",
                    Brand = "Aurora",
                    Type = "Plush",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Aurora Axolotl Plush",
                    Description = "A unique and cuddly axolotl plush from Aurora.",
                    Price = 2000,
                    PictureUrl = "/images/products/plush-axolotl.png",
                    Brand = "Aurora",
                    Type = "Plush",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Clefairy Squishmallow",
                    Description = "A squishy and cute Clefairy from Squishmallow.",
                    Price = 2500,
                    PictureUrl = "/images/products/plush-clefairy.png",
                    Brand = "Squishmallow",
                    Type = "Plush",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Jellycat Bear Keychain",
                    Description = "A charming bear keychain from Jellycat.",
                    Price = 600,
                    PictureUrl = "/images/products/keychain-bear.png",
                    Brand = "Jellycat",
                    Type = "Keychain",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Pusheen Cushion",
                    Description = "A comfortable and cute Pusheen cushion.",
                    Price = 1200,
                    PictureUrl = "/images/products/cushion-pusheen.png",
                    Brand = "Pusheen",
                    Type = "Cushion",
                    QuantityInStock = 100
                },

            };

            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }
    }
}
