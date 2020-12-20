<template>
	<f7-page>
  <offline @detected-condition="handleConnectivityChange"></offline>
		<div v-if="toast_msg != null" class="custom_toast z-depth-3">
    		{{ toast_msg }}
    	</div>
	    <div v-if="page == 'main'">
			<p style="color:#000000;margin:16px 24px 5px 18px;font-size:32px;font-weight:bold">
			<a href="/cart" class="link icon-only" style="color: #000000;height:43px;margin-right:10px"><f7-icon f7="chevron_left"></f7-icon></a>
			Select Address</p>
	        <f7-block style="margin:12px 8px 133px 8px;padding:0px">
	            <f7-block-title style="margin:0px;padding:16px 10px;color:#000000">
	      			<h5 class="mpzero" style="font-size:18px;font-weight:bold">Default Address</h5>
	      			<f7-button  popup-open=".editadd" outline color="black" style="font-size:18px;font-weight:bold;position:absolute;right:10px;top:6px;text-transform:capitalize">+ Add New</f7-button>
	      		</f7-block-title>
            <center>
        <div v-if="preloader" class="preloader" style="margin:25px 0px 10px 0px">
        <span class="preloader-inner">
          <span class="preloader-inner-gap"></span>
          <span class="preloader-inner-left">
              <span class="preloader-inner-half-circle"></span>
          </span>
          <span class="preloader-inner-right">
              <span class="preloader-inner-half-circle"></span>
          </span>
        </span>
        </div>
      </center>
			    <f7-block style="padding:0px;margin-top:10px">
			        <f7-list no-hairlines no-hairlines-between style="margin:0px">
			        	<template v-for="result in address">
			             <li v-show="result.deleted_at==null">
			                <label class="item-content item-radio">
			                  <input type="radio" :value="result.address" v-model="active_address"><i class="icon icon-radio"></i>
			                  <div class="item-inner">
			                    <div class="card" style="margin: 0px; width: 100%;-webkit-box-shadow:none;box-shadow:none;border-radius:4px;border:1px solid gray">
			                      <div class="card-content card-content-padding" style="margin: 0px; padding: 10px;color:gray">
			                        <h4 class="mpzero" style="color:#000000;font-size:16px">Name : {{result.first_name}} {{result.last_name}}</h4>
			                        <h5 class="mpzero" style="font-size:14px">Detail Address : {{result.address}}</h5>
			                        <h5 class="mpzero" style="font-size:14px">Landmark : {{result.area}}</h5>
			                      </div>
			                    </div>
			                  </div>
			                </label>
			            </li>
			            </template>
			        </f7-list>
			    </f7-block>
			    <f7-block style="position:fixed;bottom:0px;left:0px;width:100%;margin:0px;background-color:#000000;color:#FFCC00;padding:10px 0px">
			    	<f7-row>
			    		<f7-col style="font-size:18px;font-weight:bold;text-align:center">
				        Delivery Time
				        <p style="color:#FFFFFF;margin:0px;font-size:14px">30-40 Mins</p>
				        </f7-col>
				        <f7-col style="font-size:16px;font-weight:bold">
				          <f7-button v-show="loader==false" :disabled="disabled" big fill @click="placeOrder($f7router,'/payment')" style="background-color:#FFCC00;color:#000000;height:100%;;font-size:18px;font-weight:bold;border:0px;margin:0px 10px;text-transform:capitalize" fill large>Next <f7-icon f7="chevron_right" style="margin:-5px 0px 0px 10px"></f7-icon></f7-button>
                  <f7-button v-show="loader==true" big fill style="background-color:#FFCC00;color:#000000;height:100%;;font-size:18px;font-weight:bold;border:0px;margin:0px 10px;text-transform:capitalize" fill large><f7-preloader></f7-preloader></f7-button>
				        </f7-col>
			    	</f7-row>
			    </f7-block>
	        </f7-block>
	        <f7-popup class="editadd">
	            <p style="color:#000000;margin:16px 24px 5px 18px;font-size:32px;font-weight:bold">
				<a href="#" class="link icon-only popup-close" style="color: #000000;height:43px;margin-right:5px"><i class="icon f7-icons" style="line-height:50px">icon-close</i></a>
				New Address</p>
		    	<f7-block style="padding:0px;margin:0px">
				    <f7-list no-hairlines no-hairlines-between style="padding:0px;margin:0px">
				      <f7-list-item>
				        <div class="row no-gap">
				          <div class="col">
				            <f7-list-input label="First Name" @input="fname = $event.target.value" :value="fname" floating-label type="text" placeholder="First Name" clear-button style="text-align:left">
	                		</f7-list-input>
				          </div>
				          <div class="col">
				            <f7-list-input label="Last Name" @input="lname = $event.target.value" :value="lname" floating-label type="text" placeholder="Last Name" clear-button style="text-align:left">
	                		</f7-list-input>
				          </div>
				        </div>
				      </f7-list-item>
				      <f7-list-item>
				        <f7-list-input label="Detail Address" @input="user_address = $event.target.value" :value="user_address" floating-label type="text" placeholder="Detail Address" clear-button style="text-align:left;width:100%">
	                	</f7-list-input>
				      </f7-list-item>
				      <f7-list-item>
				        <f7-list-input label="Landmark" @input="area = $event.target.value" :value="area" floating-label type="text" placeholder="Near or Behind..." clear-button style="text-align:left;width:100%">
	                	</f7-list-input>
				      </f7-list-item>
					</f7-list>
					<f7-block style="position:fixed;bottom:0px;left:0px;width:100%;margin:0px;background-color:#000000;color:#FFCC00;padding:10px 0px">
			    	<f7-row style="margin:0px 10px">
			    		<f7-col style="font-size:18px;font-weight:bold;text-align:center">
				          <f7-button @click="clearData" popup-close style="background-color:#000000;color:#FFCC00;height:100%;font-size:18px;font-weight:bold;margin:0px;border:1px solid #FFCC00;text-transform:Capitalize" fill large>Cancel</f7-button>
				        </f7-col>
				        <f7-col style="font-size:16px;font-weight:bold">
				          <f7-button @click="addnew" popup-close style="background-color:#FFCC00;color:#000000;height:100%;font-size:18px;font-weight:bold;border:0px;margin:0px;text-transform:capitalize" fill large>Save</f7-button>
				        </f7-col>
			    	</f7-row>
			    	</f7-block>
		    	</f7-block>
	        </f7-popup>
	    </div>
	</f7-page>
</template>

<script>
import axios from '../axios';
import offline from 'v-offline';
export default{
	data()
	{
		return{
			fname:null,
		    lname:null,
		    user_address:null,
		    mobile:null,
		    area:null,
		    disabled:true,
		    toast_msg:null,
		    address:[],
		    address_id:null,
		    active_address:null,
		    page:'main',
		    select_address:null,
        preloader:true,
        loader:false,
        internet:null,
        status:'not shown',
        orders:[],
        offerApplied:null
		}
	},
	watch:{
    	active_address:function(){
      		if(this.active_address != null)
      		{
        		this.disabled = false;
      		}	
    	}
  	},
    components: {
        offline
    },
	mounted()
	{
    this.checkUserDailyOrders();
		this.getadd();
	},
	methods:{
    checkUserDailyOrders()
        {
            axios({
                method: 'GET',
                url: 'getUserOfferNumber/'+localStorage.getItem('loginmobile')
            }).then(response => {
                this.orders = response.data.result;
                var count = 0;
                for(var i=0;i<this.orders.length;i++)
                {
                    if(this.orders[i].created_at==1)
                    {
                        count = count + 1;
                    }
                }
                var count1 = 0;
                for(var i=0;i<this.orders.length;i++)
                {
                    if(this.orders[i].offerApplied==1)
                    {
                        count1 = count1 + 1;
                    }
                }
                var d = new Date();
            console.log(d);
            var date = d.getDate();
            var offerDate = localStorage.getItem('offerDate');
                console.log(count);
                if(count<=0 && count1<=2)
                {
                    this.offerApplied = true;
                }
                else{
                    this.offerApplied = false;
                }
                console.log(this.offerApplied);
            },(error) => {
                if (error.response.data.message != undefined) {
                  alert(error.response.data.message);
                }
                else {
                  alert('connection error found,please retry again');
                }
            });
        },
  handleConnectivityChange(status) {
      this.internet = status;
      console.log(this.internet);
      if(this.internet == false)
      {
        console.log('f');
        this.showNotificationWithButton();
      }
      if(this.internet == true)
      {
        console.log('t');
        this.closepop();
      }
    },
     showNotificationWithButton() {
        const self = this;

        if (!self.notificationWithButton) {
          self.notificationWithButton = self.$f7.notification.create({
            icon: '',
            title: '',
            cssClass:'color',
            subtitle: 'Please Connect to Internet',
            text: ''
          });
        }
        // Open it
        self.notificationWithButton.open();
      },
    closepop:function(){
      const self = this;
      self.notificationWithButton.close();
    },
    openPopup:function(){

      if(this.status == 'notshown')
      {
      this.popupOpened = true;

      this.status = 'shown';

      }
    },
		addnew:function()
	    {
        this.preloader = true;
        axios({
          method:'POST',
          url : 'user/addAddress',
          data:{
            'first_name':this.fname,
            'last_name':this.lname,
            'mobile':localStorage.getItem('loginmobile'),
            'address':this.user_address,
            'area':this.area
          }
        }).then(response => {
          this.popupActive = false;
          this.toast_msg = 'Address successfully added';
          this.getadd();
          this.clearData();
          setTimeout(() => {
            this.toast_msg = null;
          },2000);
          console.log(response);
        }).catch(error => {
          if(error.response.data.message != undefined)
            alert(error.response.data.message);
          else
            alert('failed to add new address');
        });
	    },
	    getadd:function(){
	      this.address = [];
	      console.log(localStorage.getItem('loginmobile'));
	      axios({
	        method:'GET',
	        url : '/user/address/json/'+localStorage.getItem('loginmobile')
	      }).then(response => {
	        this.address=response.data.result;
          this.preloader = false;
	        console.log(this.address);
	      }).catch(error => {
	        if (error.response.data.message != undefined)
	          alert(error.response.data.message);
	        else
	          alert('system error found,please try again');
	      });
	    },
	    clearData()
	    {
		    this.fname = null;
		    this.lname = null;
		    this.user_address = null;
		    this.area = null;
	    },
	    placeOrder(route,path)
	    {
        localStorage.setItem("address",this.active_address);
        var d = localStorage.getItem('deliveryCharge');
        if(d=='true')
        {
          d = 1;
        }
        else{
          d = null;
        }
        localStorage.setItem("deliveryCharge",d);
        console.log(localStorage.getItem('discountApplied'));
        route.navigate(path);
        /*
        this.loader = true;
	    	console.log(this.active_address);
        var d = localStorage.getItem('deliveryCharge');
        if(d=='true')
        {
          d = 1;
        }
        else{
          d = null;
        }
	    	axios({
	          method: 'POST',
	          url: '/user/placeOrder',
	          data: {
	            'address': this.active_address,
	            'contact': localStorage.getItem('loginmobile'),
              'offerApplied':localStorage.getItem('discountApplied'),
              'deliveryCharge':d
	          }
	        }).then(response => {
	        	this.page = 'success';
            this.loader = false;
            localStorage.removeItem('discountApplied');
            localStorage.removeItem('deliveryCharge');
	        	console.log(response);
	        }).catch(error => {
	        	if (error.response.data.message != undefined)
	          		alert(error.response.data.message);
	        	else
	          		alert('system error found,please try again');
	      	});*/
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