<template>
	<f7-page>
		<div v-show="page==null">
		<p style="color:#000000;margin:16px 24px 5px 18px;font-size:32px;font-weight:bold">
			<a href="/select_address" class="link icon-only" style="color: #000000;height:43px;margin-right:10px"><f7-icon f7="chevron_left"></f7-icon></a>
			Payment Option
		</p>
		<f7-block style="padding:0px;margin:12px 8px">
      <f7-list no-hairlines no-hairlines-between style="margin:0px">
        <template v-for="result in option">
    			<li>
          <label class="item-content item-radio">
                            <input type="radio" :value="result.type" v-model="active_option"><i class="icon icon-radio"></i>
                            <div class="item-inner">
                              <div style="font-size:16px;font-weight:bold">
                                {{result.type}}
                              </div>
                            </div>
                          </label>
          </li>
  		  </template>
      </f7-list>
    </f7-block>
		<f7-block v-show="bottomNav==true" style="position:fixed;bottom:0px;left:0px;width:100%;margin:0px;background-color:#000000;color:#FFCC00;padding:10px 0px">
			<f7-row>
			   	<f7-col style="font-size:18px;font-weight:bold;text-align:center">
				    Delivery Time
				  	<p style="color:#FFFFFF;margin:0px;font-size:14px">30-40 Mins</p>
				</f7-col>
				<f7-col style="font-size:16px;font-weight:bold">
				    <f7-button v-show="loader==false" :disabled="disabled" big fill @click="placeOrder" style="background-color:#FFCC00;color:#000000;height:100%;;font-size:18px;font-weight:bold;border:0px;margin:0px 10px;text-transform:capitalize" fill large>{{btn_text}}<f7-icon f7="chevron_right" style="margin:-5px 0px 0px 10px"></f7-icon></f7-button>
                  	<f7-button v-show="loader==true" big fill style="background-color:#FFCC00;color:#000000;height:100%;;font-size:18px;font-weight:bold;border:0px;margin:0px 10px;text-transform:capitalize" fill large><f7-preloader></f7-preloader></f7-button>
				</f7-col>
			</f7-row>
		</f7-block>
		</div>
		<div style="margin-top:20vh" v-if="page == 'success'">
	      <center>
	      <div class="check_mark">
	        <div class="sa-icon sa-success animate">
	          <span class="sa-line sa-tip animateSuccessTip"></span>
	          <span class="sa-line sa-long animateSuccessLong"></span>
	          <div class="sa-placeholder"></div>
	          <div class="sa-fix"></div>
	        </div>
	      </div>
	      <h3 style="color:black;font-size:20px;font-weight:bold;margin-bottom:30px">Order Successfully placed</h3>
        <h2 style="color:black;font-size:16px;font-weight:bold;margin-bottom:30px">You will get order in 30-40 Mins.<br><br>Tell Your friends and family about<br>Moonfood's Everday Lowest Price.</h2>
        <a class="link external button button-fill button-large" :href="'https://wa.me/?text=Hi,%20Do%20you%20know%20there%20is%20app%20called%20Moonfood%20where%20you%20get%20GREAT%20FOOD%20at%20THE%20LOWEST%20PRICE%20IN%20KOLHAPUR.%20Also%20Get%20additional%2010%25%20Off%20by%20using%20my%20refer%20code-'+this.loginmobile+'%20at%20the%20time%20of%20login.%20Download%20Link-%20https://play.google.com/store/apps/details?id=in.moonfood.android'" style="background-color:#FFCC00;color:#000000;height:56px;line-height:56px;font-size:18px;font-weight:bold;border:1px solid #FFCC00;margin:20px 15px;text-transform:capitalize" fill large>Tell through Whatsapp</a>
        <f7-button href="/home" style="background-color:#FFFFFF;color:#FFCC00;height:100%;font-size:18px;font-weight:bold;border:1px solid #FFCC00;margin:20px 15px;text-transform:capitalize;height:56px;line-height:56px" fill large>Later</f7-button>
	      </center>
	    </div>
	</f7-page>
</template>

<script>
//import razorpay from '../router/razorpay';
import axios from '../axios';
import RazorpayCheckout from '../../../aa/plugins/com.razorpay.cordova/www/RazorpayCheckout';
export default{
	data()
	{
		return{
			option:[
				{"type":"Cash on Delivery"},
				{"type":"Pay Online"}
			],
			active_option:null,
			loader:false,
			disabled:false,
			btn_text:null,
			bottomNav:false,
			page:null
		};
	}, 
	watch:{
    	active_option:function(){
      		if(this.active_option=="Cash on Delivery")
      		{
      			this.bottomNav = true;
      			this.btn_text = "Done";
      		}
      		if(this.active_option=="Pay Online")
      		{
      			this.bottomNav = true;
      			this.btn_text = "Pay";
      		}
    	}
  	},
	methods:{
		placeOrder()
		{
			console.log('gjh');
			if(this.btn_text=="Done")
			{
				this.loader = true;
				axios({
			          method: 'POST',
			          url: '/user/placeOrder',
			          data: {
			            'address': localStorage.getItem('address'),
			            'contact': localStorage.getItem('loginmobile'),
		              'offerApplied':localStorage.getItem('discountApplied'),
		              'deliveryCharge':localStorage.getItem('deliveryCharge'),
                  'payment_type':this.active_option,
                  'coupon_id':localStorage.getItem('coupon_id'),
                  'coupon_code':localStorage.getItem('coupon_code'),
                  'carryBag':localStorage.getItem('carryBag'),
                  'tissue':localStorage.getItem('tissue')
			          }
			        }).then(response => {
			        	this.page = 'success';
		            this.loader = false;
		            localStorage.removeItem('discountApplied');
		            localStorage.removeItem('deliveryCharge');
		            localStorage.removeItem('address');
                localStorage.removeItem('coupon_code');
                localStorage.removeItem('coupon_id');
                localStorage.removeItem('carryBag');
			        	console.log(response);
			        }).catch(error => {
			        	if (error.response.data.message != undefined)
			          		alert(error.response.data.message);
			        	else
			          		alert('system error found,please try again');
			      	});
			}
			if(this.btn_text=="Pay")
			{
				//razorpay.pay(1);
				//this.loader = true;
        var price = localStorage.getItem('price');
        price = price * 100;
				var options = {
  					currency: 'INR',
  					key: 'rzp_live_2iiLWLut7DUEdt',
  					name: 'Moonfood',
  					amount: price,
  					theme: {
  	  					color: '#070707'
  					}
				};
				var successCallback = payment_id => {
					console.log('gf');
					//this.page = 'success';
					this.order();
				};

				var cancelCallback = function(error) {
				  console.log('cancel');
				};
				
				RazorpayCheckout.open(options,successCallback,cancelCallback);
			}
		},
		order()
		{
			console.log('bf');
      this.page = 'success';
			axios({
			          method: 'POST',
			          url: '/user/placeOrder',
			          data: {
			            'address': localStorage.getItem('address'),
			            'contact': localStorage.getItem('loginmobile'),
		              'offerApplied':localStorage.getItem('discountApplied'),
		              'deliveryCharge':localStorage.getItem('deliveryCharge'),
                  'payment_type':this.active_option
			          }
			        }).then(response => {
			        	this.page = 'success';
		            localStorage.removeItem('discountApplied');
		            localStorage.removeItem('deliveryCharge');
		            localStorage.removeItem('address');
			        	console.log(response);
			        }).catch(error => {
			        	if (error.response.data.message != undefined)
			          		alert(error.response.data.message);
			        	else
			          		alert('system error found,please try again');
			      	});
				}
	}
};
</script>

<style scoped>
.f7-icons{
	font-size:32px !important;
}
.z-depth-3 {
  -webkit-box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
}
.custom_toast{
  z-index: 9999;
  position:fixed;
  bottom: 80px;
  text-overflow: ellipsis;
  left:0;
  right:0;
  margin: auto;
  max-width:250px;
  background-color:#000000;
  color:white;
  border-radius:3px;
  text-align: center;
  font-size:17px;
  padding:10px;
}
.sa-icon {
    width: 80px;
    height: 80px;
    border: 4px solid gray;
    -webkit-border-radius: 40px;
    border-radius: 40px;
    border-radius: 50%;
    margin: 20px auto;
    padding: 0;
    position: relative;
    box-sizing: content-box;
  }

  .sa-icon.sa-success {
    border-color: #FFCC00;
  }

  .sa-icon.sa-success::before, .sa-icon.sa-success::after {
    content: '';
    -webkit-border-radius: 40px;
    border-radius: 40px;
    border-radius: 50%;
    position: absolute;
    width: 74px;
    height: 120px;
    background: white;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .sa-icon.sa-success::before {
    -webkit-border-radius: 120px 0 0 120px;
    border-radius: 120px 0 0 120px;
    top: -19px;
    left: -22px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-transform-origin: 60px 60px;
    transform-origin: 60px 60px;
  }

  .sa-icon.sa-success::after {
    -webkit-border-radius: 0 120px 120px 0;
    border-radius: 0 120px 120px 0;
    top: -11px;
    left: 30px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-transform-origin: 0px 60px;
    transform-origin: 0px 60px;
  }

  .sa-icon.sa-success .sa-placeholder {
    width: 80px;
    height: 80px;
    border: 4px solid rgba(76, 175, 80, .5);
    -webkit-border-radius: 40px;
    border-radius: 40px;
    border-radius: 50%;
    box-sizing: content-box;
    position: absolute;
    left: -4px;
    top: -4px;
    z-index: 2;
  }

  .sa-icon.sa-success .sa-fix {
    width: 5px;
    height: 90px;
    background-color: white;
    position: absolute;
    left: 28px;
    top: 8px;
    z-index: 1;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .sa-icon.sa-success.animate::after {
    -webkit-animation: rotatePlaceholder 4.25s ease-in;
    animation: rotatePlaceholder 4.25s ease-in;
  }

  .sa-icon.sa-success {
    border-color: transparent\9;
  }
  .sa-icon.sa-success .sa-line.sa-tip {
    -ms-transform: rotate(45deg) \9;
  }
  .sa-icon.sa-success .sa-line.sa-long {
    -ms-transform: rotate(-45deg) \9;
  }

  .animateSuccessTip {
    -webkit-animation: animateSuccessTip 0.75s;
    animation: animateSuccessTip 0.75s;
  }

  .animateSuccessLong {
    -webkit-animation: animateSuccessLong 0.75s;
    animation: animateSuccessLong 0.75s;
  }

  @-webkit-keyframes animateSuccessLong {
    0% {
      width: 0;
      right: 46px;
      top: 54px;
    }
    65% {
      width: 0;
      right: 46px;
      top: 54px;
    }
    84% {
      width: 55px;
      right: 0px;
      top: 35px;
    }
    100% {
      width: 47px;
      right: 8px;
      top: 38px;
    }
  }
  @-webkit-keyframes animateSuccessTip {
    0% {
      width: 0;
      left: 1px;
      top: 19px;
    }
    54% {
      width: 0;
      left: 1px;
      top: 19px;
    }
    70% {
      width: 50px;
      left: -8px;
      top: 37px;
    }
    84% {
      width: 17px;
      left: 21px;
      top: 48px;
    }
    100% {
      width: 25px;
      left: 14px;
      top: 45px;
    }
  }
  @keyframes animateSuccessTip {
    0% {
      width: 0;
      left: 1px;
      top: 19px;
    }
    54% {
      width: 0;
      left: 1px;
      top: 19px;
    }
    70% {
      width: 50px;
      left: -8px;
      top: 37px;
    }
    84% {
      width: 17px;
      left: 21px;
      top: 48px;
    }
    100% {
      width: 25px;
      left: 14px;
      top: 45px;
    }
  }

  @keyframes animateSuccessLong {
    0% {
      width: 0;
      right: 46px;
      top: 54px;
    }
    65% {
      width: 0;
      right: 46px;
      top: 54px;
    }
    84% {
      width: 55px;
      right: 0px;
      top: 35px;
    }
    100% {
      width: 47px;
      right: 8px;
      top: 38px;
    }
  }

  .sa-icon.sa-success .sa-line {
    height: 5px;
    background-color: #FFCC00;
    display: block;
    border-radius: 2px;
    position: absolute;
    z-index: 2;
  }

  .sa-icon.sa-success .sa-line.sa-tip {
    width: 25px;
    left: 14px;
    top: 46px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .sa-icon.sa-success .sa-line.sa-long {
    width: 47px;
    right: 8px;
    top: 38px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  @-webkit-keyframes rotatePlaceholder {
    0% {
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
    }
    5% {
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
    }
    12% {
      transform: rotate(-405deg);
      -webkit-transform: rotate(-405deg);
    } 
    100% {
      transform: rotate(-405deg);
      -webkit-transform: rotate(-405deg);
    }
  }
  @keyframes rotatePlaceholder {
    0% {
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
    }
    5% {
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
    }
    12% {
      transform: rotate(-405deg);
      -webkit-transform: rotate(-405deg);
    }
    100% {
      transform: rotate(-405deg);
      -webkit-transform: rotate(-405deg);
    }
  }
</style>