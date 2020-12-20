<template>
	<f7-page>
	<offline @detected-condition="handleConnectivityChange"></offline>
	<div v-if="toast_msg != null" class="custom_toast z-depth-3">
        {{ toast_msg }}
    </div>
		<p style="color:#000000;margin:16px 24px 24px 18px;font-size:32px;font-weight:bold">
			<a href="/home" class="link icon-only" style="color: #000000;height:43px;margin-right:10px"><f7-icon f7="chevron_left"></f7-icon></a>
			Orders
		</p>
		<center>
		<div v-if="preloader==true && length==null" class="preloader" style="margin:25px 0px 10px 0px">
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
		<f7-block v-if="length==0 && preloader==true">
			<center style="margin-top:15vh">
	      		<img src="../assets/waiting.svg" alt=""></img>
	      		<p style="font-size:20px;font-weight:bold;margin-bottom:0px">No order history</p>
	      		<p style="font-size:16px">(Waiting to build relation with you !)</p>
      		</center>
		</f7-block>
		<div v-show="length>0">
		<template v-for="(result,index) in orders" style="font-size:16px">
			<f7-block-title style="margin:0px 16px 16px" v-show="index<5">
		        <f7-row>
		          <f7-col>
		          	<h5 v-if="result.order_id<100" class="mpzero" style="font-size:16px;color:#FFCC00">Order No: MNFK100{{result.order_id}}</h5>
		          	<h5 v-if="result.order_id>99 && result.order_id<1000" class="mpzero" style="font-size:16px;color:#FFCC00">Order No: MNFK10{{result.order_id}}</h5>
		          	<h5 v-if="result.order_id>1000" class="mpzero" style="font-size:16px;color:#FFCC00">Order No: MNFK1{{result.order_id}}</h5>
		          </f7-col>
		        </f7-row>
	        </f7-block-title>
	        <f7-block style="padding:0px;margin:0px 0px 40px 0px">
	            <f7-card style="-webkit-box-shadow:none;box-shadow:none;border-radius:8px;border:1px solid gray;margin:0px 10px 0px 10px">
	            <f7-row v-show="result.completed==0" no-gap style="margin:16px 0px 0px 16px">
				        <f7-col width="35" style="text-align:center;height:135px;background-color:#000000;color:#FFCC00;border-radius:8px"> 
				          <img src="../assets/food_delivery.svg"alt="" style="margin-top:16px">
				          <p style="text-align:center;font-weight:bold;margin-top:8px">Live Order</p>
				        </f7-col>
				        <f7-col width="65" style="background-color:#FFFFFF;color:#000000"> 
				          <div class="timeline" style="margin:16px 0px">
				            <div class="timeline-item">
				              <div class="timeline-item-divider" style="background:green"></div>
				              <div v-show="result.status==1" class="timeline-item-content blinking" style="color:green;font-weight:bold">Food is preparing</div>
				              <div v-show="result.status==2 || result.status==3" class="timeline-item-content" style="color:green;font-weight:bold">Food is preparing</div>
				            </div>
				            <div class="timeline-item">
				              <div v-if="result.status==1" class="timeline-item-divider"></div>
				              <div v-else class="timeline-item-divider" style="background:green"></div>
				              <div v-show="result.status==1" class="timeline-item-content" style="color:#757575">Delivery on way</div>
				              <div v-show="result.status==2" class="timeline-item-content blinking" style="color:green;font-weight:bold">Delivery on way</div>
				              <div v-show="result.status==3" class="timeline-item-content" style="color:green;font-weight:bold">Delivery on way</div>
				            </div>
				            <div class="timeline-item">
				              <div v-if="result.status==1 || result.status==2" class="timeline-item-divider"></div>
				              <div v-else class="timeline-item-divider" style="background:green"></div>
				              <div v-show="result.status==1 || result.status==2" class="timeline-item-content" style="color:#757575">Near you area</div>
				              <div v-show="result.status==3" class="timeline-item-content blinking" style="color:green;font-weight:bold">Near your area</div>
				            </div>
				          </div>
				        </f7-col>
				      </f7-row>
	              <f7-card-header>
	                <h5 class="mpzero" style="color:#000000;font-size:16px">Delivery Address : <span style="font-weight:normal;font-size:14px">{{result.address}}</span></h5>
	              </f7-card-header>
	              <f7-card-content style="padding:10px 0px 0px">
	                <f7-block style="margin:0px">
	                  <template v-for="(data,i) in result.menus">
	                    <div style="border-bottom:1px solid #000000;margin-bottom:12px;padding-bottom:12px">
		                    <f7-row no-gap style="padding-bottom:8px">
			                    <f7-col width="40" style="font-size:16px;font-weight:bold;color:#000000">{{data.name}}<span v-show="data.cheese==1">(Cheese)</span></f7-col>
			                    <f7-col width="20" style="text-align:right">
			                    	<p class="mpzero" style="font-size:14px;font-weight:bold;color:#000000">₹ {{data.price}}</p>
			                    </f7-col>
			                    <f7-col width="20" style="text-align:right">
		                    		<p class="mpzero" style="font-size:14px;font-weight:bold;color:#000000">{{data.qty}} Qty</p>
		                    	</f7-col>
		                    	<f7-col width="20" style="text-align:right">
		                    		<p class="mpzero" style="font-size:16px;font-weight:bold;color:#000000">₹ {{data.price*data.qty}}</p>
		                    	</f7-col>
		                  	</f7-row>
		                  	<f7-row v-show="data.packaging>0" style="padding-bottom:8px">
		                  		<f7-col width="80" style="font-size:16px;color:#000000">Standard Packaging</f7-col>
		                  		<f7-col width="20" style="font-size:16px;color:#000000;text-align:right">₹ {{data.qty * data.packaging}}</f7-col>
		                  	</f7-row>
		                  	<f7-row style="padding-bottom:8px" v-show="(data.menu_id==1 || data.menu_id==3 || data.menu_id==24) && data.spoon==1">
		                  		<f7-col width="80" style="font-size:16px;color:#000000">Spoon</f7-col>
		                  		<f7-col width="20" style="font-size:16px;color:#000000;text-align:right">₹ {{0.4 * data.qty}}</f7-col>
		                  	</f7-row>
		                </div>
	                  </template>
	                  <f7-row v-show="result.carryBag==1" style="padding-bottom:8px">
	                  		<f7-col width="80" style="font-size:16px;color:#000000">Paper Carry Bag</f7-col>
	                  		<f7-col width="20" style="font-size:16px;color:#000000;text-align:right">₹ {{carryBagPrice[index]}}</f7-col>
	                  </f7-row>
	                  <f7-row v-show="result.tissue==1" style="padding-bottom:8px">
	                  		<f7-col width="80" style="font-size:16px;color:#000000">Tissue Paper</f7-col>
	                  		<f7-col width="20" style="font-size:16px;color:#000000;text-align:right">₹ {{tissuePrice[index]}}</f7-col>
	                  </f7-row>
	                  <f7-row v-show="result.deliveryCharge==1" style="padding-bottom:8px">
	                  		<f7-col width="80" style="font-size:16px;color:#000000">Delivery Charge</f7-col>
	                  		<f7-col width="20" style="font-size:16px;color:#000000;text-align:right">₹ 5</f7-col>
	                  </f7-row>
	                  <f7-row v-show="result.offerApplied==1" style="padding-bottom:8px">
	                  		<f7-col width="80" style="font-size:16px;font-weight:bold;color:#000000">Discount</f7-col>
	                  		<f7-col width="20" style="font-size:16px;font-weight:bold;color:#000000;text-align:right">-₹ {{discount[index]}}</f7-col>
	                  </f7-row>
	                  <f7-row v-show="result.coupon_id==1 || result.coupon_id==2" style="padding-bottom:8px">
	                  		<f7-col width="80" style="font-size:16px;font-weight:bold;color:#000000">Coupon Code Discount</f7-col>
	                  		<f7-col width="20" style="font-size:16px;font-weight:bold;color:#000000;text-align:right">-₹ {{discount[index]}}</f7-col>
	                  </f7-row>
	                  <hr style="color:#FFCC00 !important;border-color:#FFCC00 !important"/>
	                  <f7-row no-gap style="color:#000000;font-size:18px;font-weight:bold">
	                      <f7-col width="75">
	                        <p v-if="result.payment_type=='Cash on Delivery' || result.payment_type==null" class="mpzero" style="padding-top:8px">Total &nbsp;<span style="color:green">(Cash On Delivery)</span></p>
	                        <p v-else class="mpzero" style="padding-top:8px">Total &nbsp;<span style="color:green">(Paid Online)</span></p>
	                      </f7-col>
	                      <f7-col width="25" style="text-align:right">
	                        <p class="mpzero" style="padding-top:8px">₹ {{eachOrderTotal[index]}}</p>
	                      </f7-col>
	                  </f7-row>
	                </f7-block>
	                <div v-show="result.completed==0">
	                	<h5 style="left:0px;color:#000000;font-size:16px;line-height:32px;padding:26px 16px" class="mpzero">Delivering within 30 mins <f7-icon f7="time_fill" size="30px" color="red" style="float:right"></f7-icon></h5>
	                </div>
	                <div v-show="result.completed==1">
	                	<h5 style="left:0px;color:#000000;font-size:16px;line-height:32px;padding:26px 16px" class="mpzero">Delivered <f7-icon f7="check_round_fill" size="30px" style="float:right" color="green"></f7-icon></h5>
	              	</div>
	              	<div v-show="result.completed==2">
	                	<h5 style="left:0px;color:#000000;font-size:16px;line-height:32px;padding:26px 16px" class="mpzero">Cancelled <f7-icon f7="check_round_fill" size="30px" style="float:right" color="red"></f7-icon></h5>
	              	</div>
	              </f7-card-content>
	            <f7-card-footer v-show="result.completed==0">
	                <f7-segmented style="width:100%">
              			<f7-button color="green" class="link external" :href="'tel:' + 8600198512" style="font-size:16px;font-weight:bold;text-transform:capitalize">Edit Order</f7-button>
              			<f7-button color="red" class="link external" :href="'tel:' + 8600198512" style="font-size:16px;font-weight:bold;text-transform:capitalize">Cancel Order</f7-button>
            		</f7-segmented><br><br>
	            </f7-card-footer>
	            <!--<f7-segmented v-show="result.completed==0" style="width:100%;margin-left:210px;margin-top:-15px">
            			<span style="color:black;font-size:20px">(2 : 00)</span>
            		</f7-segmented>-->
	            <f7-block v-show="result.completed==1 && result.rating==null" style="padding:0px 0px 16px">
		          <h3 style="padding:0px 16px">Rate this order</h3>
		          <star-rating @rating-selected="setRating($event,index)" :star-size="30" :show-rating="false"  style="padding:5px 16px"></star-rating>
		          <f7-list no-hairlines-md style="margin:10px 0px" v-show="submitButton[i]==true && i==index">
		                <f7-list-input label="Write your experience (Optional)" floating-label type="text" @input="feedback[index] = $event.target.value" clear-button style="text-align:left">
		                </f7-list-input>
		          </f7-list>
		          <f7-button btn fill large @click="saveFeedback(result.order_id,index)" v-show="submitButton[i]==true && i==index" style="background-color:#000000;color:#FFCC00;font-size:18px;font-weight:bold;text-transform:capitalize;margin:0px 16px">Submit</f7-button>
		        </f7-block>
	            </f7-card>
	        </f7-block>
        </template>
        </div>
	</f7-page>
</template>

<script>
import axios from '../axios';
import offline from 'v-offline';
import StarRating from 'vue-star-rating';
export default{
	data()
	{
		return{
			orders:[],
			menuPrice:[],
			menuName:[],
			menuPackaging:[],
			eachOrderTotal:[],
			length:null,
			preloader:true,
			date:[],
			discount:[],
			discountDate:false,
			internet:null,
        	status:'not shown',
        	rating:[],
        	feedback:[],
        	submitButton:[],
        	toast_msg:null,
        	i:null,
        	carryBagPrice:[],
        	tissuePrice:[],
        	qtyCount:[]
		};
	},
	mounted()
	{
		this.getOrders();
		setInterval(function(){
			if(localStorage.getItem('loginmobile')!=null)
		    	this.getOrders();
		}.bind(this), 10000);
	},
	components: {
        offline,
        StarRating
    },
	methods:{
	saveFeedback(id,index)
	{
		console.log(id);
		console.log(this.rating[index]);
		console.log(this.feedback[index]);
		this.preloader = true;
		    this.length = null;
		axios({
		    method:'POST',
		    url : 'saveFeedback',
		    data:{
		    	'order_id': id,
		    	'rating': this.rating[this.i],
		    	'feedback': this.feedback[this.i]
		    }
		}).then(response => {
		    console.log(response);
		    this.rating[index] = null;
		    this.feedback[index] = null;
		    this.toast_msg = 'Thanks for your Feedback';
        	setTimeout(() => {
          		this.toast_msg = null;
        	},2000);
		    this.getOrders();
		    this.preloader = false;
		}).catch(error => {
		    if(error.response.data.message != undefined)
		        alert(error.response.data.message);
		    else
		       	alert('failed to add new address');
		});
	},
	setRating(rating,index)
	{
		this.rating[index] = rating;
		console.log(this.rating[index]);
		this.i = index;
		console.log(index);
		if(this.rating[index]>0)
			this.submitButton[index] = true;
		console.log(this.submitButton[index]);
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
		getOrders()
		{
			var d = new Date();
			console.log(d);
			var date = d.getDate();
			console.log(date);
			axios({
		        method:'GET',
		        url : '/usersOrders/'+localStorage.getItem('loginmobile')
		      }).then(response => {
		        this.orders=response.data.result;
		        console.log(this.orders);
		        this.length = this.orders.length;
		        if(this.length>0)
		        {
		        	for(var i=0;i<=3;i++)
				    {	
				    	this.eachOrderTotal[i] = 0;
						for(var j=0;j<this.orders[i].menus.length;j++)
						{
							if(this.orders[i].menus[j].menu_id == 1)
							{
								this.menuName[j] = 'Fried Maggi';
								this.menuPrice[j] = 16;
								if(this.orders[i].menus[j].cheese==1)
								{
									this.menuPrice[j] = this.menuPrice[j] + 10;
								}
							}
							if(this.orders[i].menus[j].menu_id == 2)
							{
								this.menuName[j] = 'Double Bread Omlette';
								this.menuPrice[j] = 14;
							}
							if(this.orders[i].menus[j].menu_id == 3)
							{
								this.menuName[j] = 'Olee Bhel';
								this.menuPrice[j] = 16;
							}
							if(this.orders[i].menus[j].menu_id == 4)
							{
								this.menuName[j] = 'Suki Bhel';
								this.menuPrice[j] = 25;
							}
							if(this.orders[i].menus[j].menu_id == 5)
							{
								this.menuName[j] = 'Bread Chilla';
								this.menuPrice[j] = 14;
							}
							if(this.orders[i].menus[j].menu_id == 6)
							{
								this.menuName[j] = 'Double Egg Bhurji';
								this.menuPrice[j] = 30;
								if(this.orders[i].menus[j].cheese==1)
								{
									this.menuPrice[j] = this.menuPrice[j] + 10;
								}
							}
							if(this.orders[i].menus[j].menu_id == 7)
							{
								this.menuName[j] = 'Bread';
								this.menuPrice[j] = 2;
							}	
							if(this.orders[i].menus[j].menu_id == 8)
							{
								this.menuName[j] = 'Ketchup';
								this.menuPrice[j] = 2;
							}
							if(this.orders[i].menus[j].menu_id == 9)
							{
								this.menuName[j] = 'Shev';
								this.menuPrice[j] = 2;
							}
							if(this.orders[i].menus[j].menu_id == 10)
							{
								this.menuName[j] = 'Bhel Combo';
								this.menuPrice[j] = 60;
							}
							if(this.orders[i].menus[j].menu_id == 11)
							{
								this.menuName[j] = 'Double Egg Bhurji Combo';
								this.menuPrice[j] = 65;
							}
							if(this.orders[i].menus[j].menu_id == 12)
							{
								this.menuName[j] = 'Fried Maggi Combo';
								this.menuPrice[j] = 60;
							}
							if(this.orders[i].menus[j].menu_id == 13)
							{
								this.menuName[j] = 'Double Bread Omlette Combo';
								this.menuPrice[j] = 55;
							}
							if(this.orders[i].menus[j].menu_id == 14)
							{
								this.menuName[j] = 'Boiled Eggs';
								this.menuPrice[j] = 14;
							}
							if(this.orders[i].menus[j].menu_id == 15)
							{
								this.menuName[j] = 'Mix Veg Roll';
								this.menuPrice[j] = 31;
								if(this.orders[i].menus[j].cheese==1)
								{
									this.menuPrice[j] = this.menuPrice[j] + 10;
								}
							}
							if(this.orders[i].menus[j].menu_id == 16)
							{
								this.menuName[j] = 'Paneer Masala Roll';
								this.menuPrice[j] = 42;
								if(this.orders[i].menus[j].cheese==1)
								{
									this.menuPrice[j] = this.menuPrice[j] + 10;
								}
							}
							if(this.orders[i].menus[j].menu_id == 17)
							{
								this.menuName[j] = 'Single Omlette Roll';
								this.menuPrice[j] = 29;
								if(this.orders[i].menus[j].cheese==1)
								{
									this.menuPrice[j] = this.menuPrice[j] + 10;
								}
							}
							if(this.orders[i].menus[j].menu_id == 18)
							{
								this.menuName[j] = 'Double Omlette Roll';
								this.menuPrice[j] = 35;
								if(this.orders[i].menus[j].cheese==1)
								{
									this.menuPrice[j] = this.menuPrice[j] + 10;
								}
							}
							if(this.orders[i].menus[j].menu_id == 19)
							{
								this.menuName[j] = 'Chicken Masala Roll';
								this.menuPrice[j] = 45;
								if(this.orders[i].menus[j].cheese==1)
								{
									this.menuPrice[j] = this.menuPrice[j] + 10;
								}
							}
							if(this.orders[i].menus[j].menu_id == 20)
							{
								this.menuName[j] = 'Single Omlette Chicken Masala Roll';
								this.menuPrice[j] = 52;
								if(this.orders[i].menus[j].cheese==1)
								{
									this.menuPrice[j] = this.menuPrice[j] + 10;
								}
							}
							if(this.orders[i].menus[j].menu_id == 21)
							{
								this.menuName[j] = 'Double Omlette Chicken Masala Roll';
								this.menuPrice[j] = 60;
								if(this.orders[i].menus[j].cheese==1)
								{
									this.menuPrice[j] = this.menuPrice[j] + 10;
								}
							}
							if(this.orders[i].menus[j].menu_id == 22)
							{
								this.menuName[j] = 'Coca-Cola';
								this.menuPrice[j] = 20;
							}
							if(this.orders[i].menus[j].menu_id == 23)
							{
								this.menuName[j] = 'Thums Up';
								this.menuPrice[j] = 20;
							}
							if(this.orders[i].menus[j].menu_id == 24)
							{
								this.menuName[j] = 'Soupy Maggi';
								this.menuPrice[j] = 13;
							}
							if(this.orders[i].menus[j].menu_id == 25)
							{
								this.menuName[j] = 'Sprite';
								this.menuPrice[j] = 20;
							}
							if(this.orders[i].menus[j].menu_id == 26)
							{
								this.menuName[j] = 'Chicken Masala Roll + Thums Up';
								this.menuPrice[j] = 70;
								if(this.orders[i].menus[j].cheese==1)
								{
									this.menuPrice[j] = this.menuPrice[j] + 10;
								}
							}
							if(this.orders[i].menus[j].menu_id == 27)
							{
								this.menuName[j] = 'Chicken Masala Roll + Sprite';
								this.menuPrice[j] = 70;
								if(this.orders[i].menus[j].cheese==1)
								{
									this.menuPrice[j] = this.menuPrice[j] + 10;
								}
							}
							if(this.orders[i].menus[j].menu_id == 28)
							{
								this.menuName[j] = 'Paneer Masala Roll + Thums Up';
								this.menuPrice[j] = 65;
								if(this.orders[i].menus[j].cheese==1)
								{
									this.menuPrice[j] = this.menuPrice[j] + 10;
								}
							}
							if(this.orders[i].menus[j].menu_id == 29)
							{
								this.menuName[j] = 'Paneer Masala Roll + Sprite';
								this.menuPrice[j] = 65;
								if(this.orders[i].menus[j].cheese==1)
								{
									this.menuPrice[j] = this.menuPrice[j] + 10;
								}
							}
							if(this.orders[i].menus[j].menu_id == 30)
							{
								this.menuName[j] = 'Double Egg Bhurji + Thums Up';
								this.menuPrice[j] = 55;
								if(this.orders[i].menus[j].cheese==1)
								{
									this.menuPrice[j] = this.menuPrice[j] + 10;
								}
							}
							if(this.orders[i].menus[j].menu_id == 31)
							{
								this.menuName[j] = 'Double Egg Bhurji + Sprite';
								this.menuPrice[j] = 55;
								if(this.orders[i].menus[j].cheese==1)
								{
									this.menuPrice[j] = this.menuPrice[j] + 10;
								}
							}
							if(this.orders[i].menus[j].menu_id == 32)
							{
								this.menuName[j] = 'Veg Jumbo Sandwich';
								this.menuPrice[j] = 30;
								if(this.orders[i].menus[j].cheese==1)
								{
									this.menuPrice[j] = this.menuPrice[j] + 10;
								}
							}
							if(this.orders[i].menus[j].menu_id == 33)
							{
								this.menuName[j] = 'Veg Mini Grilled Sandwich';
								this.menuPrice[j] = 30;
								if(this.orders[i].menus[j].cheese==1)
								{
									this.menuPrice[j] = this.menuPrice[j] + 10;
								}
							}
							if(this.orders[i].menus[j].menu_id == 34)
							{
								this.menuName[j] = 'French Fries';
								this.menuPrice[j] = 32;
							}
							if(this.orders[i].menus[j].menu_id == 35)
							{
								this.menuName[j] = 'Masala French Fries';
								this.menuPrice[j] = 42;
							}
							if(this.orders[i].menus[j].menu_id == 36)
							{
								this.menuName[j] = 'Peri Peri French Fries';
								this.menuPrice[j] = 37;
							}
							if(this.orders[i].menus[j].menu_id == 37)
							{
								this.menuName[j] = 'Veg Jumbo Sandwich + French Fries';
								this.menuPrice[j] = 60;
								if(this.orders[i].menus[j].cheese==1)
								{
									this.menuPrice[j] = this.menuPrice[j] + 10;
								}
							}
							if(this.orders[i].menus[j].menu_id == 38)
							{
								this.menuName[j] = 'Veg Mini Grilled Sandwich + French Fries';
								this.menuPrice[j] = 60;
								if(this.orders[i].menus[j].cheese==1)
								{
									this.menuPrice[j] = this.menuPrice[j] + 10;
								}
							}
							this.menuPackaging[j] = this.orders[i].menus[j].qty * this.orders[i].menus[j].packaging; 
							this.menuPackaging[i] = parseFloat(this.menuPackaging[j]);
							var spoonPrice = 0;
							if(this.orders[i].menus[j].spoon==1)
								spoonPrice = this.orders[i].menus[j].qty * 0.4;
							this.eachOrderTotal[i] = this.eachOrderTotal[i] + (this.menuPrice[j] * this.orders[i].menus[j].qty) + this.menuPackaging[j] + spoonPrice;
						}
						var offerDate = localStorage.getItem('offerDate');
						if(this.orders[i].offerApplied==1)
						{
							var discount = (this.eachOrderTotal[i]*10)/100;
							discount = Math.floor(discount);
							this.eachOrderTotal[i] = this.eachOrderTotal[i] - discount;
							this.discount[i] = discount;
						}
						else
						{
							this.eachOrderTotal[i] = this.eachOrderTotal[i] - 0;
						}
						if(this.orders[i].coupon_id==1)
						{
							var discount = (this.eachOrderTotal[i]*70)/100;
							discount = Math.floor(discount);
							console.log(discount);
							if(discount>70)
							{
								this.eachOrderTotal[i] = this.eachOrderTotal[i] - 70;
								this.discount[i] = 70;
							}
							else
							{
								this.eachOrderTotal[i] = this.eachOrderTotal[i] - discount;
								this.discount[i] = discount;
							}
							console.log(this.eachOrderTotal[i]);
						}
						if(this.orders[i].coupon_id==2)
						{
							var discount = (this.eachOrderTotal[i]*100)/100;
							discount = Math.floor(discount);
							if(discount>100)
							{
								this.eachOrderTotal[i] = this.eachOrderTotal[i] - 100;
								this.discount[i] = 100;
							}
							else
							{
								this.eachOrderTotal[i] = this.eachOrderTotal[i] - discount;
								this.discount[i] = discount;
							}
						}
						var count = 0;
						for(var k=0;k<this.orders[i].menus.length;k++)
							{
								count = count + this.orders[i].menus[k].qty;
							}
							this.qtyCount[i] = count;
						if(this.orders[i].carryBag==1)
						{
							if(this.qtyCount[i]<=3)
								this.carryBagPrice[i] = 1.5;
							if(this.qtyCount[i]>3)
								this.carryBagPrice[i] = 2;
							this.eachOrderTotal[i] = this.eachOrderTotal[i] + this.carryBagPrice[i];
						}
						this.tissuePrice[i] = this.qtyCount[i]*0.25;
						//alert(this.tissuePrice);
						if(this.orders[i].tissue==1)
						{
							this.eachOrderTotal[i] = this.eachOrderTotal[i] + (0.25*this.qtyCount[i]);	
						}
						console.log(this.eachOrderTotal[i]);
						
						if(this.orders[i].deliveryCharge==null)
						{
							this.eachOrderTotal[i] = this.eachOrderTotal[i];
						}
						else if(this.orders[i].deliveryCharge==1)
						{
							this.eachOrderTotal[i] = this.eachOrderTotal[i] + 5;
						}
						this.eachOrderTotal[i] = (this.eachOrderTotal[i]).toFixed(2);
						var decimal = this.eachOrderTotal[i] - Math.floor(this.eachOrderTotal[i]);
						if(decimal<0.5)
							this.eachOrderTotal[i] = Math.floor(this.eachOrderTotal[i]);
						if(decimal>=0.5)
							this.eachOrderTotal[i] = Math.ceil(this.eachOrderTotal[i]);
				    }
				    this.preloader = false;
		        }
		    }).catch(error => {
		        if (error.response.data.message != undefined)
		          alert(error.response.data.message);
		        else
		          alert('system error found,please try again');
		    });
		},
		cancelOrder(id)
		{
			const app = this.$f7;
         app.dialog.confirm('Are You Really Want to Cancel this Order?','Cancel Order', () => {
            this.preloader = true;
			this.length = null;
			axios({
		        method:'POST',
		        url : 'cancelOrder',
		        data:{
		          'order_id': id
		        }
		    }).then(response => {
		      	
		        console.log(response);
		        this.getOrders();
		        this.preloader = false;
		      }).catch(error => {
		        if(error.response.data.message != undefined)
		          alert(error.response.data.message);
		        else
		          alert('failed to add new address');
		    });
 });
		}
	}
};
</script>

<style scoped>
.blinking{
    animation:blinkingText 1.2s infinite;
}
@keyframes blinkingText{
    0%{     color: green;    }
    49%{    color: green; }
    60%{    color: transparent; }
    99%{    color:transparent;  }
    100%{   color: green;    }
}
.lineclampin{
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
    width: 100% !important;
}
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
</style>