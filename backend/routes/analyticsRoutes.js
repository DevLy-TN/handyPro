const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/total-users', analyticsController.getTotalUsers);
router.get('/services-by-category', analyticsController.getServicesByCategory);
router.get('/active-service-providers', analyticsController.getActiveServiceProviders);
router.get('/users-by-type', analyticsController.getUsersByType);
router.get('/new-users', analyticsController.getNewUsers);
router.get('/total-services', analyticsController.getTotalServices);
router.get('/active-services', analyticsController.getActiveServices);
router.get('/total-bookings', analyticsController.getTotalBookings);
router.get('/bookings-by-status', analyticsController.getBookingsByStatus);
router.get('/average-booking-value', analyticsController.getAverageBookingValue);
router.get('/total-revenue', analyticsController.getTotalRevenue);
router.get('/payments-by-status', analyticsController.getPaymentsByStatus);
router.get('/revenue-by-payment-method', analyticsController.getRevenueByPaymentMethod);
router.get('/average-rating-by-service', analyticsController.getAverageRatingByService);
router.get('/top-rated-providers', analyticsController.getTopRatedProviders);
router.get('/unread-notifications', analyticsController.getUnreadNotifications);

module.exports = router;