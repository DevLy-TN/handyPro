const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker/locale/en');
const prisma = new PrismaClient();

async function main() {
  // Seed Users
//   const users = [];
//   for (let i = 0; i < 10; i++) {
//     users.push(
//       prisma.user.create({
//         data: {
//           email: faker.internet.email().slice(0, 50),  // Limit to 50 chars
//           password: faker.internet.password().slice(0, 50), // Limit password length
//           username: faker.internet.userName().slice(0, 50), // Limit to 50 chars
//           userType: i % 2 === 0 ? 'CUSTOMER' : 'ADMIN',
//           address: faker.location.streetAddress().slice(0, 255), // Limit to 255 chars
//           phoneNumber: faker.phone.number().slice(0, 15), // Limit to 15 chars
//           photoUrl: faker.image.avatar().slice(0, 1024), // Limit to 1024 chars
//         },
//       })
//     );
//   }
//   await Promise.all(users);

  // Seed Service Providers
//   const providers = [];
//   for (let i = 0; i < 5; i++) {
//     providers.push(
//         prisma.serviceProvider.create({
//             data: {
//               userId: i + 11,
//               email: faker.internet.email().slice(0, 255),
//               password: faker.internet.password().slice(0, 50),
//               username: faker.internet.username().slice(0, 50),
//               certification: Buffer.from(faker.string.alphanumeric(10)),
//               identityCard: Buffer.from(faker.string.alphanumeric(10)),
//               photoUrl: faker.image.avatar().slice(0, 1024),
//               address: faker.location.streetAddress().slice(0, 255),
//               phoneNumber: faker.phone.number().slice(0, 15),
//               age: faker.number.int({ min: 18, max: 99 }).toString(),
//               rating: faker.number.float({ min: 0, max: 5, precision: 0.1 }),
//               isAvailable: faker.datatype.boolean(),
//             },
//           })
//     );
//   }
//   await Promise.all(providers);

  // Seed Categories
//   const categories = [];
//   for (let i = 0; i < 3; i++) {
//     categories.push(
//       prisma.category.create({
//         data: {
//           name: faker.commerce.department().slice(0,50),
//           description: faker.commerce.productDescription(),
//           image: faker.image.url({ width: 640, height: 480, category: 'business' }),
//         },
//       })
//     );
//   }
//   await Promise.all(categories);

  // Seed Services
  const services = [];
  for (let i = 0; i < 10; i++) {
    services.push(
      prisma.service.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: faker.number.float({ min: 20, max: 100, precision: 0.01 }),
          duration: faker.number.int({ min: 30, max: 120 }),
          providerId: (i % 5) + 1,
          categoryId: (i % 3) + 1,
          isActive: faker.datatype.boolean(),
          image: faker.image.url(),
        },
      })
    );
  }
  await Promise.all(services);

  // Seed Bookings
  const bookings = [];
  for (let i = 0; i < 20; i++) {
    bookings.push(
      prisma.booking.create({
        data: {
          userId: (i % 10) + 1,
          serviceId: (i % 10) + 1,
          providerId: (i % 5) + 1,
          bookingDate: faker.date.future(),
          status: 'PENDING',
          notes: faker.lorem.sentence(),
          totalPrice: faker.number.float({ min: 50, max: 200, precision: 0.01 }),
        },
      })
    );
  }
  await Promise.all(bookings);

  // Seed Reviews
  const reviews = [];
  for (let i = 0; i < 20; i++) {
    reviews.push(
      prisma.review.create({
        data: {
          serviceId: (i % 10) + 1,
          userId: (i % 10) + 1,
          providerId: (i % 5) + 1,
          rating: faker.number.int({ min: 1, max: 5 }),
          comment: faker.lorem.sentence(),
        },
      })
    );
  }
  await Promise.all(reviews);

  // Seed Payments
  const payments = [];
  for (let i = 0; i < 20; i++) {
    payments.push(
      prisma.payment.create({
        data: {
          bookingId: (i % 20) + 1,
          amount: faker.number.float({ min: 50, max: 200, precision: 0.01 }),
          status: 'PENDING',
          paymentMethod: i % 2 === 0 ? 'ONLINE' : 'CASH',
          transactionId: faker.string.uuid(),
        },
      })
    );
  }
  await Promise.all(payments);

  // Seed Notifications
  const notifications = [];
  for (let i = 0; i < 10; i++) {
    notifications.push(
      prisma.notification.create({
        data: {
          userId: (i % 10) + 1,
          providerId: i % 5 === 0 ? null : (i % 5) + 1,
          title: faker.lorem.words(5),
          message: faker.lorem.sentence(),
          isRead: faker.datatype.boolean(),
        },
      })
    );
  }
  await Promise.all(notifications);

  console.log('Database seeded with dummy data');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
