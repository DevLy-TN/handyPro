const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getTotalUsers = async (req, res) => {
  // count all user with role "CUSTOMER"
  
  const customers = await prisma.user.count({
    where : {
      userType : "CUSTOMER"
    }
  });
  const serviceProviders = await prisma.serviceProvider.count()
  res.json({ customers , serviceProviders });
};

exports.getActiveServiceProviders = async (req, res) => {
  const activeProviders = await prisma.serviceProvider.count({
    where: { isAvailable: true },
  });
  res.json({ activeProviders });
};

exports.getUsersByType = async (req, res) => {
  const usersByType = await prisma.user.groupBy({
    by: ['userType'],
    _count: { userType: true },
  });
  res.json(usersByType);
};

exports.getNewUsers = async (req, res) => {
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const newUsers = await prisma.user.count({
    where: { createdAt: { gte: lastMonth } },
  });
  res.json({ newUsers });
};

exports.getTotalServices = async (req, res) => {
  const totalServices = await prisma.service.count();
  res.json({ totalServices });
};

exports.getActiveServices = async (req, res) => {
  const activeServices = await prisma.service.count({
    where: { isActive: true },
  });
  res.json({ activeServices });
};

exports.getServicesByCategory = async (req, res) => {
  const servicesByCategory = await prisma.category.findMany({
    include: {
      services: true,
    },
  });
  res.json(servicesByCategory);
};

exports.getTotalBookings = async (req, res) => {
  const totalBookings = await prisma.booking.count();
  res.json({ totalBookings });
};
exports.getStatsBookings = async (req, res) => {
  // method to retrieve all bookings , rejected bookings , pending bookings , Confirmed , cancelled , completed
  // const bookings = await prisma.booking.groupBy({
  //   by: ['status'],
  //   _count: { status: true },
  // }); 
  //count Pending booking status
  
};
exports.getBookingsByStatus = async (req, res) => {
  const pendingBookings = await prisma.booking.count({
    where: { status: 'PENDING' },
  });
  //count Confirmed booking status
  const confirmedBookings = await prisma.booking.count({
    where: { status: 'CONFIRMED' },
  });
  //count Cancelled booking status
  const cancelledBookings = await prisma.booking.count({
    where: { status: 'CANCELLED' },
  });
  //count Completed booking status
  const completedBookings = await prisma.booking.count({
    where: { status: 'COMPLETED' },
  });
  //count Rejected booking status
  const rejectedBookings = await prisma.booking.count({
    where: { status: 'REJECTED' },
  });
  //count Total bookings
  const totalBookings = await prisma.booking.count();
  res.json({
    totalBookings,
    pendingBookings,
    confirmedBookings,
    cancelledBookings,
    completedBookings,
    rejectedBookings,
  });
};

exports.getAverageBookingValue = async (req, res) => {
  const result = await prisma.booking.aggregate({
    _avg: { totalPrice: true },
  });
  res.json({ averageBookingValue: result._avg.totalPrice });
};

exports.getTotalRevenue = async (req, res) => {
  const revenue = await prisma.payment.aggregate({
    _sum: { amount: true },
    where: { status: 'COMPLETED' },
  });
  res.json({ totalRevenue: revenue._sum.amount });
};

exports.getPaymentsByStatus = async (req, res) => {
  const paymentsByStatus = await prisma.payment.groupBy({
    by: ['status'],
    _count: { status: true },
  });
  res.json(paymentsByStatus);
};

exports.getRevenueByPaymentMethod = async (req, res) => {
  const revenueByMethod = await prisma.payment.groupBy({
    by: ['paymentMethod'],
    _sum: { amount: true },
  });
  res.json(revenueByMethod);
};

exports.getAverageRatingByService = async (req, res) => {
  const ratingsByService = await prisma.review.groupBy({
    by: ['serviceId'],
    _avg: { rating: true },
  });
  res.json(ratingsByService);
};

exports.getTopRatedProviders = async (req, res) => {
  const topProviders = await prisma.serviceProvider.findMany({
    orderBy: { rating: 'desc' },
    take: 10,
  });
  res.json(topProviders);
};

exports.getUnreadNotifications = async (req, res) => {
  const unreadNotifications = await prisma.notification.count({
    where: { isRead: false },
  });
  res.json({ unreadNotifications });
};