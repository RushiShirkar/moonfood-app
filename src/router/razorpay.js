import RazorpayCheckout from '../../../aa/plugins/com.razorpay.cordova/www/RazorpayCheckout';
export default{
pay(money)
{
        var m = money*100;
            var options = {
  currency: 'INR',
  key: 'rzp_live_2iiLWLut7DUEdt',
  name: 'Moonfood',
  amount: m,
  theme: {
    color: '#070707'
  }
};
var successCallback = function(payment_id) {
  console.log('payment_id: ' + payment_id);
};
var cancelCallback = function(error) {
  console.log(error.description + ' (Error '+error.code+')');
};
RazorpayCheckout.open(options, successCallback, cancelCallback);
}
}