using System;
using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            //prvoto e poleto od Entitetot a vtorio parametar e vistinksata klasa
           builder.OwnsOne(o => o.ShipToAddress, a => {
               a.WithOwner();
           });
           builder.Property(s => s.OrderStatus)
                .HasConversion(o => o.ToString(),
                o => (OrderStatus) Enum.Parse(typeof(OrderStatus),o)
                );
            
                            // many - to -one
            builder.HasMany(o => o.OrderItems)
                .WithOne().OnDelete(DeleteBehavior.Cascade);
        }
    }

}