<template>
	<f7-page>
        <offline @detected-condition="handleConnectivityChange"></offline>
        <div v-if="toast_msg != null" class="custom_toast z-depth-3">
            {{ toast_msg }}
        </div>
		<p style="color:#000000;margin:16px 24px 5px 18px;font-size:32px;font-weight:bold">
		<a href="/home" class="link icon-only" style="color: #000000;height:43px;margin-right:10px"><f7-icon f7="chevron_left"></f7-icon></a>
		Delivery Cart</p>
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
      <f7-block v-show="length<=0 && preloader==false && emptyCart==true">
      	<center style="margin-top:15vh">
      		<img src="../assets/waiting.svg" alt=""></img>
      		<p style="font-size:20px;font-weight:bold;margin-bottom:0px">Cook waiting for your order !</p>
      		<p style="font-size:16px">(Add something to cart)</p>
      	</center>
      </f7-block>
        <f7-block v-show="length>0 && preloader==false" style="margin:12px 8px 133px 8px;padding:0px">
            <template v-for="(result,index) in cartData">
            	<div style="border-bottom:1px solid gray;padding:20px 0px 15px 0px">
                <f7-row v-show="result.qty>0" no-gap style="padding:5px 0px">
    			        <f7-col width="40">
    			                <span style="color:#000000;text-align:left;padding-left:15px;margin:0px;font-size:16px;font-weight:bold;display:inline-block">{{menu_name[index]}}</span><br>
                          <span v-show="result.cheese==1" style="text-align:left">Cheese</span>
    			        </f7-col>
    			        <f7-col width="40" style="text-align:right">
    			          <f7-stepper v-model="result.qty" @input="getIndex(index,result.cheese)" @stepper:change="changeQty" color="black" raised small></f7-stepper>
    			        </f7-col>
    			        <f7-col width="20" style="font-size:16px;font-weight:bold;padding-right:15px;text-align:right">
                            ₹{{eachMenuPrice[index]}}
    			        </f7-col>
  			        </f7-row>
                <f7-row no-gap style="padding-top:5px">
                  <f7-col width="80">
                    <span style="color:#000000;margin:0px;padding-left:15px;font-size:16px;display:inline-block;text-align:left">Standard Packaging</span>
                  </f7-col>
                  <f7-col width="20" style="font-size:16px;text-align:right;padding-right:15px">
                    ₹{{menu_packaging[index]}}
                  </f7-col>
                </f7-row>
                <f7-row v-show="result.menu_id==1 || result.menu_id==3 || result.menu_id==24">
                  <f7-col width="80">
                    <f7-list no-hairlines style="margin:0px">
                      <f7-list-item checkbox class="my_checkbox" :checked="result.spoon==1" @change="addOrRemoveSpoon($event,index)" style="font-size:16px" title="Spoon"></f7-list-item>
                    </f7-list>
                  </f7-col>
                  <f7-col v-show="result.spoon==1" width="20" style="font-size:16px;text-align:right;padding-right:15px;line-height:48px">
                    ₹{{0.4*result.qty}}
                  </f7-col>
                </f7-row>
              </div>
            </template>
            <f7-row no-gap style="border-top:1px solid #FFCC00">
                    <f7-col width="40" style="font-size:16px;font-weight:bold;padding:20px 0px 0px 15px">Item Price</f7-col>
                    <f7-col width="40"></f7-col>
                    <f7-col width="20" style="font-size:16px;font-weight:bold;padding:20px 15px 0px 0px;text-align:right">₹{{totalCartPrice}}</f7-col>
            </f7-row>
                <f7-row no-gap style="color:#757575">
                        <f7-col width="80" style="font-size:16px;padding:8px 0px 0px 0px;">
                          <f7-list no-hairlines style="margin:0px">
                            <f7-list-item checkbox class="my_checkbox" :checked="carryBag=='true'" @change="selectCarryBag($event)" style="font-size:16px" title="Paper Carry Bag"></f7-list-item>
                          </f7-list>
                        </f7-col>
                        <f7-col v-show="carryBag=='true'" width="20" style="font-size:16px;padding:20px 15px 0px 0px;text-align:right">₹{{carryBagPrice}}</f7-col>
                </f7-row>
                <f7-row no-gap style="color:#757575">
                        <f7-col width="80" style="font-size:16px;padding:0px;">
                          <f7-list no-hairlines style="margin:0px">
                            <f7-list-item checkbox class="my_checkbox" :checked="tissue=='true'" @change="selectTissue($event)" style="font-size:16px" title="Tissue Paper"></f7-list-item>
                          </f7-list>
                        </f7-col>
                        <f7-col v-show="tissue=='true'" width="20" style="font-size:16px;padding:12px 15px 0px 0px;text-align:right">₹{{qtyCount*0.25}}</f7-col>
                </f7-row>
                </f7-row>
                <f7-row v-show="deliveryCharge=='true' && deliveryCharge!=null" no-gap style="color:#757575">
                    <f7-col width="80" style="font-size:16px;padding:8px 0px 20px 15px">Delivery Charge<br><span style="font-size:14px;font-weight:light">( Free Delivery above ₹99 )</span></f7-col>
                    <f7-col width="20" style="font-size:16px;padding:8px 15px 20px 0px;text-align:right">₹5</f7-col>
                </f7-row>
                <f7-row v-show="deliveryCharge=='false' && deliveryCharge!=null" no-gap style="color:#757575">
                    <f7-col width="80" style="font-size:16px;padding:8px 0px 20px 15px">Delivery Charge<br><span style="font-size:14px;font-weight:light">( Free Delivery above ₹99 )</span></f7-col>
                    <f7-col width="20" style="font-size:16px;padding:8px 15px 20px 0px;text-align:right;color:green">FREE</f7-col>
                </f7-row>
                <f7-row no-gap v-show="discountApplied=='false' || discountApplied==null" style="border:1px dotted #757575;border-radius:5px">
                    <f7-col width="60" style="font-size:16px;font-weight:bold;padding:15px 0px 15px 15px">Coupon Code</f7-col>
                    <f7-col width="20"></f7-col>
                    <f7-col width="20" style="font-size:16px;font-weight:bold;padding:15px 15px 15px 0px;text-align:right"><f7-link href="/coupon" style="color:green">APPLY</f7-link></f7-col>
                </f7-row>
                <f7-row v-show="discountApplied=='true'" no-gap style="border:1px dotted #757575;border-radius:5px">
                  <f7-col width="60" style="font-size:16px;font-weight:bold;padding:15px 0px 15px 15px">{{coupon_name}}</f7-col>
                  <f7-col width="40" style="font-size:16px;font-weight:bold;padding:15px 15px 15px 0px;text-align:right"><f7-link @click="removeCoupon" style="color:green">REMOVE</f7-link></f7-col><br>
                </f7-row>
                <f7-row v-show="discountApplied=='true'" no-gap>
                    <f7-col width="80" style="font-size:16px;font-weight:bold;padding:20px 0px 0px 15px">Coupon Discount</f7-col>
                    <f7-col width="20" style="font-size:16px;font-weight:bold;padding:20px 15px 0px 0px;text-align:right">- ₹{{discount}}</f7-col>
                </f7-row>
                <f7-row no-gap style="border-top:1px solid #FFCC00;margin-top:25px">
                    <f7-col width="40" style="font-size:16px;font-weight:bold;padding:20px 0px 0px 15px">Total Price</f7-col>
                    <f7-col width="40"></f7-col>
                    <f7-col width="20" style="font-size:16px;font-weight:bold;padding:20px 15px 0px 0px;text-align:right">₹{{roundup}}</f7-col>
            </f7-row>
		    <f7-block v-show="length>0 && preloader==false" style="position:fixed;bottom:0px;left:0px;width:100%;margin:0px;background-color:#000000;color:#FFCC00;padding:10px 0px">
		    	<f7-row>
		    		<f7-col style="font-size:18px;font-weight:bold;text-align:center;line-height:48px">
			        <span style="color:#FFFFFF">To Pay :</span> ₹{{totalDiscountedCartPrice}}
			        </f7-col>
			        <f7-col style="font-size:16px;font-weight:bold">
			          <f7-button big fill large @click="checkMenu($f7router,'/select_address')" style="background-color:#FFCC00;color:#000000;height:120%;font-size:18px;font-weight:bold;border:0px;margin:0px 10px;text-transform:capitalize" fill>Next <f7-icon f7="chevron_right" style="margin:-5px 0px 0px 10px"></f7-icon></f7-button>
			        </f7-col>
		    	</f7-row>
		    </f7-block>
        </f7-block>
	</f7-page>
</template>

<script>
import axios from '../axios';
import offline from 'v-offline';
export default
{
	data()
	{
		return{
			cartData:[],
			totalCartPrice:0,
            totalDiscountedCartPrice:0,
			preloader:true,
			menu_name:[],
			menu_price:[],
            menu_packaging:[],
            spoonSelected:[],
			eachMenuPrice:[],
			emptyCart:false,
            length:null,
            index:null,
            toast_msg:null,
            internet:null,
            status:'not shown',
            orders:[],
            roundup:null,
            discount:null,
            offerApplied:null,
            discountApplied:null,
            deliveryCharge:null,
            coupon_name:null,
            carryBagPrice:null,
            carryBag:null,
            tissue:null,
            qtyCount:null
		};
	},
    components: {
        offline
    },
	mounted()
	{
        //this.getUserDiscount();
        localStorage.setItem('carryBag','true'); 
        localStorage.setItem('tissue','true');  
        this.checkUserDailyOrders();
		this.getUserCart();
	},
	methods:{
        /*getUserDiscount()
        {
            axios({
                method: 'GET',
                url: 'getUserDiscount/'+localStorage.getItem('loginmobile')
            }).then(response => {
                console.log(response.data.result);;
                var n = response.data.result
                if(n>0)
                {
                    this.discountApplied = true;
                }
                else
                {
                    this.discountApplied = false;   
                }
                localStorage.setItem("discountApplied",this.discountApplied);
                console.log(localStorage.getItem("discountApplied"));
            },(error) => {
                if (error.response.data.message != undefined) {
                  alert(error.response.data.message);
                }
                else {
                  alert('connection error found,please retry again');
                }
            });
        },*/
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
                }var count1 = 0;
                for(var i=0;i<this.orders.length;i++)
                {
                    if(this.orders[i].offerApplied==1)
                    {
                        count1 = count1 + 1;
                    }
                }
                if(count<=0 && count1<=2)
                {
                    this.offerApplied = true;
                }
                else{
                    this.offerApplied = false;
                }
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
    removeCoupon()
    {
      console.log('fghj');
      this.preloader = true;
      localStorage.removeItem("discountApplied");
      localStorage.removeItem("coupon_code");
      localStorage.removeItem("coupon_id");
      this.getUserCart();
    },
        checkMenu(route,path)
        {
            var extras = null;
            for(var i=0;i<this.cartData.length;i++)
            {
                if(this.cartData[i].menu_id==1 || this.cartData[i].menu_id==2 || this.cartData[i].menu_id==3 || this.cartData[i].menu_id==5 || this.cartData[i].menu_id==6 ||
                    this.cartData[i].menu_id==10 || this.cartData[i].menu_id==14 || this.cartData[i].menu_id==15 || this.cartData[i].menu_id==16 || 
                     this.cartData[i].menu_id==17 || this.cartData[i].menu_id==18 || this.cartData[i].menu_id==19 || this.cartData[i].menu_id==20 || this.cartData[i].menu_id==21 ||
                     this.cartData[i].menu_id==24 || this.cartData[i].menu_id==26 || this.cartData[i].menu_id==27 || this.cartData[i].menu_id==28 || this.cartData[i].menu_id==29 ||
                      this.cartData[i].menu_id==30 || this.cartData[i].menu_id==31 || this.cartData[i].menu_id==32 || this.cartData[i].menu_id==33 || this.cartData[i].menu_id==34 || this.cartData[i].menu_id==35 || this.cartData[i].menu_id==36 || this.cartData[i].menu_id==37 || this.cartData[i].menu_id==38)
                {
                    extras = true;
                    break;
                }
                else{
                    extras = false;
                }
            }
            console.log(extras);
            if(extras==false)
            {
                this.toast_msg = 'You cannot order just Beverages and Extras.Add Menu from Home.';
                setTimeout(() => {
                  this.toast_msg = null;
                },3000);
            }
            else
            {
                if(localStorage.getItem('status')=='Open Now')
                {
                    if(this.deliveryCharge=='true')
                    {
                        localStorage.setItem('deliveryCharge','true');
                    }
                    localStorage.setItem('price',this.totalDiscountedCartPrice);
                    route.navigate(path);
                }
                else
                {
                    this.toast_msg = 'You cannot place order because Moonfood is Closed Now.';
                    setTimeout(() => {
                        this.toast_msg = null;
                    },3000);
                }
            }
        },
        addOrRemoveSpoon(event,index)
        {
          console.log(index);
           if(event.target.checked)
            {
                this.spoonSelected[index] = true;
                axios({
                    method: 'POST',
                    url: 'addSpoonToCart',
                    data: {
                      menu_id: this.cartData[index].menu_id,
                      spoon:1,
                      mobile:localStorage.getItem('loginmobile')
                    }
                }).then(response => {
                    console.log(response.data.result);
                    this.getUserCart();
                },(error) => {
                    if (error.response.data.message != undefined) {
                      alert(error.response.data.message);
                    }
                    else {
                      alert('connection error found,please retry again');
                    }
                });
            }
            else
            {
                this.spoonSelected[index] = false;
                axios({
                    method: 'POST',
                    url: 'addSpoonToCart',
                    data: {
                      menu_id: this.cartData[index].menu_id,
                      spoon:0,
                      mobile:localStorage.getItem('loginmobile')
                    }
                }).then(response => {
                    console.log(response.data.result);
                    this.getUserCart();
                },(error) => {
                    if (error.response.data.message != undefined) {
                      alert(error.response.data.message);
                    }
                    else {
                      alert('connection error found,please retry again');
                    }
                });
            }
        },
        selectCarryBag(event)
        {
          this.totalDiscountedCartPrice = parseFloat(this.totalDiscountedCartPrice);
            if(event.target.checked)
            {
                this.totalDiscountedCartPrice = this.totalDiscountedCartPrice + this.carryBagPrice;
                this.carryBag = 'true';
                localStorage.setItem('carryBag','true');
            }
            else
            {
                this.totalDiscountedCartPrice = this.totalDiscountedCartPrice - this.carryBagPrice;
                this.carryBag = 'false';
                localStorage.removeItem('carryBag');
            }
            this.totalDiscountedCartPrice = (this.totalDiscountedCartPrice).toFixed(2);
            this.getUserCart();
        },
        selectTissue(event)
        {
          this.totalDiscountedCartPrice = parseFloat(this.totalDiscountedCartPrice);
            if(event.target.checked)
            {
                this.totalDiscountedCartPrice = this.totalDiscountedCartPrice + (this.qtyCount*0.25);
                this.tissue = 'true';
                localStorage.setItem('tissue','true');
            }
            else
            {
                this.totalDiscountedCartPrice = this.totalDiscountedCartPrice - (this.qtyCount*0.25);
                this.tissue = 'false';
                localStorage.removeItem('tissue');
            }
            this.totalDiscountedCartPrice = (this.totalDiscountedCartPrice).toFixed(2);
            this.getUserCart();
        },
        getUserCart()
        {
            var d = new Date();
            //console.log(d);
            var date = d.getDate();
            //onsole.log(date);
            this.carryBag = localStorage.getItem('carryBag');
            this.tissue = localStorage.getItem('tissue');
            axios({
            method:'GET',
            url : 'getUserCart/'+localStorage.getItem('loginmobile')
            }).then(response => {
                console.log(response.data.result); 
                this.cartData = response.data.result;
                this.length = this.cartData.length;
                if(this.length==0 && this.cartData!=null)
                {
                    this.emptyCart = true;
                }
                else
                {
                    for(var i=0;i<this.cartData.length;i++)
                    {
                        if(this.cartData[i].menu_id == 1)
                        {
                            this.menu_name[i] = 'Fried Maggi';
                            this.menu_price[i] = 16;
                            if(this.cartData[i].cheese==1)
                            {
                                this.menu_price[i] = this.menu_price[i] + 10;   
                            }
                            this.menu_packaging[i] = 0.8;
                        }
                        if(this.cartData[i].menu_id == 2)
                        {
                            this.menu_name[i] = 'Double Bread Omlette';
                            this.menu_price[i] = 14;
                            this.menu_packaging[i] = 0.9;
                        }
                        if(this.cartData[i].menu_id == 3)
                        {
                            this.menu_name[i] = 'Olee Bhel';
                            this.menu_price[i] = 16;
                            this.menu_packaging[i] = 0.6;
                        }
                        if(this.cartData[i].menu_id == 4)
                        {
                            this.menu_name[i] = 'Suki Bhel';
                            this.menu_price[i] = 25;
                        }
                        if(this.cartData[i].menu_id == 5)
                        {
                            this.menu_name[i] = 'Bread Chilla';
                            this.menu_price[i] = 16;
                            this.menu_packaging[i] = 0.9;
                        }
                        if(this.cartData[i].menu_id == 6)
                        {
                            this.menu_name[i] = 'Double Egg Burji';
                            this.menu_price[i] = 30;
                            if(this.cartData[i].cheese==1)
                            {
                                this.menu_price[i] = this.menu_price[i] + 10;   
                            }
                            this.menu_packaging[i] = 2.9;
                        }
                        if(this.cartData[i].menu_id == 7)
                        {
                            this.menu_name[i] = 'Bread';
                            this.menu_price[i] = 2;
                            this.menu_packaging[i] = 0.7;
                        }
                        if(this.cartData[i].menu_id == 8)
                        {
                            this.menu_name[i] = 'Ketchup';
                            this.menu_price[i] = 2;
                            this.menu_packaging[i] = 0;
                        }
                        if(this.cartData[i].menu_id == 9)
                        {
                            this.menu_name[i] = 'Shev';
                            this.menu_price[i] = 2;
                            this.menu_packaging[i] = 0.25;
                        }
                        if(this.cartData[i].menu_id == 10)
                        {
                            this.menu_name[i] = 'Olee Bhel Combo';
                            this.menu_price[i] = 60;
                            this.menu_packaging[i] = 0;
                        }
                        if(this.cartData[i].menu_id == 11)
                        {
                            this.menu_name[i] = 'Double Egg Bhurji Combo';
                            this.menu_price[i] = 75;
                            this.menu_packaging[i] = 0;
                        }
                        if(this.cartData[i].menu_id == 12)
                        {
                            this.menu_name[i] = 'Fried Maggi Combo';
                            this.menu_price[i] = 70;
                            this.menu_packaging[i] = 0;
                        }
                        if(this.cartData[i].menu_id == 13)
                        {
                            this.menu_name[i] = 'Double Bread Omlette Combo';
                            this.menu_price[i] = 55;
                            this.menu_packaging[i] = 0;
                        }
                        if(this.cartData[i].menu_id == 14)
                        {
                            this.menu_name[i] = 'Boiled Eggs';
                            this.menu_price[i] = 14;
                            this.menu_packaging[i] = 1.1;
                        }
                        if(this.cartData[i].menu_id == 15)
                        {
                            this.menu_name[i] = 'Mix Veg Roll';
                            this.menu_price[i] = 31;
                            if(this.cartData[i].cheese==1)
                            {
                                this.menu_price[i] = this.menu_price[i] + 10;   
                            }
                            this.menu_packaging[i] = 0.7;
                        }
                        if(this.cartData[i].menu_id == 16)
                        {
                            this.menu_name[i] = 'Paneer Masala Roll';
                            this.menu_price[i] = 42;
                            if(this.cartData[i].cheese==1)
                            {
                                this.menu_price[i] = this.menu_price[i] + 10;   
                            }
                            this.menu_packaging[i] = 0.7;
                        }
                        if(this.cartData[i].menu_id == 17)
                        {
                            this.menu_name[i] = 'Single Omlette Roll';
                            this.menu_price[i] = 29;
                            if(this.cartData[i].cheese==1)
                            {
                                this.menu_price[i] = this.menu_price[i] + 10;   
                            }
                            this.menu_packaging[i] = 0.7;
                        }
                        if(this.cartData[i].menu_id == 18)
                        {
                            this.menu_name[i] = 'Double Omlette Roll';
                            this.menu_price[i] = 35;
                            if(this.cartData[i].cheese==1)
                            {
                                this.menu_price[i] = this.menu_price[i] + 10;   
                            }
                            this.menu_packaging[i] = 0.7;
                        }
                        if(this.cartData[i].menu_id == 19)
                        {
                            this.menu_name[i] = 'Chicken Masala Roll';
                            this.menu_price[i] = 45;
                            if(this.cartData[i].cheese==1)
                            {
                                this.menu_price[i] = this.menu_price[i] + 10;   
                            }
                            this.menu_packaging[i] = 0.7;
                        }
                        if(this.cartData[i].menu_id == 20)
                        {
                            this.menu_name[i] = 'Single Omlette Chicken Masala Roll';
                            this.menu_price[i] = 52;
                            if(this.cartData[i].cheese==1)
                            {
                                this.menu_price[i] = this.menu_price[i] + 10;   
                            }
                            this.menu_packaging[i] = 0.7;
                        }
                        if(this.cartData[i].menu_id == 21)
                        {
                            this.menu_name[i] = 'Double Omlette Chicken Masala Roll';
                            this.menu_price[i] = 60;
                            if(this.cartData[i].cheese==1)
                            {
                                this.menu_price[i] = this.menu_price[i] + 10;   
                            }
                            this.menu_packaging[i] = 0.7;
                        }
                        if(this.cartData[i].menu_id == 22)
                        {
                            this.menu_name[i] = 'Coca-Cola';
                            this.menu_price[i] = 20;
                            this.menu_packaging[i] = 0;
                        }
                        if(this.cartData[i].menu_id == 23)
                        {
                            this.menu_name[i] = 'Thums Up';
                            this.menu_price[i] = 20;
                            this.menu_packaging[i] = 0;
                        }
                        if(this.cartData[i].menu_id == 24)
                        {
                            this.menu_name[i] = 'Soupy Maggi';
                            this.menu_price[i] = 13;
                            this.menu_packaging[i] = 1;
                        }
                        if(this.cartData[i].menu_id == 25)
                        {
                            this.menu_name[i] = 'Sprite';
                            this.menu_price[i] = 20;
                            this.menu_packaging[i] = 0;
                        }
                        if(this.cartData[i].menu_id == 26)
                        {
                            this.menu_name[i] = 'Chicken Masala Roll + Thums Up';
                            this.menu_price[i] = 70;
                            if(this.cartData[i].cheese==1)
                            {
                                this.menu_price[i] = this.menu_price[i] + 10;   
                            }
                            this.menu_packaging[i] = 0;
                        }
                        if(this.cartData[i].menu_id == 27)
                        {
                            this.menu_name[i] = 'Chicken Masala Roll + Sprite';
                            this.menu_price[i] = 70;
                            if(this.cartData[i].cheese==1)
                            {
                                this.menu_price[i] = this.menu_price[i] + 10;   
                            }
                            this.menu_packaging[i] = 0;
                        }
                        if(this.cartData[i].menu_id == 28)
                        {
                            this.menu_name[i] = 'Paneer Masala Roll + Thums Up';
                            this.menu_price[i] = 65;
                            if(this.cartData[i].cheese==1)
                            {
                                this.menu_price[i] = this.menu_price[i] + 10;   
                            }
                            this.menu_packaging[i] = 0;
                        }
                        if(this.cartData[i].menu_id == 29)
                        {
                            this.menu_name[i] = 'Paneer Masala Roll + Sprite';
                            this.menu_price[i] = 65;
                            if(this.cartData[i].cheese==1)
                            {
                                this.menu_price[i] = this.menu_price[i] + 10;   
                            }
                            this.menu_packaging[i] = 0;
                        }
                        if(this.cartData[i].menu_id == 30)
                        {
                            this.menu_name[i] = 'Double Egg Bhurji + Thums Up';
                            this.menu_price[i] = 55;
                            if(this.cartData[i].cheese==1)
                            {
                                this.menu_price[i] = this.menu_price[i] + 10;   
                            }
                            this.menu_packaging[i] = 0;
                        }
                        if(this.cartData[i].menu_id == 31)
                        {
                            this.menu_name[i] = 'Double Egg Bhurji + Sprite';
                            this.menu_price[i] = 55;
                            if(this.cartData[i].cheese==1)
                            {
                                this.menu_price[i] = this.menu_price[i] + 10;   
                            }
                            this.menu_packaging[i] = 0;
                        }
                        if(this.cartData[i].menu_id == 32)
                        {
                            this.menu_name[i] = 'Veg Jumbo Sandwich';
                            this.menu_price[i] = 30;
                            if(this.cartData[i].cheese==1)
                            {
                                this.menu_price[i] = this.menu_price[i] + 10;   
                            }
                            this.menu_packaging[i] = 1.1;
                        }
                        if(this.cartData[i].menu_id == 33)
                        {
                            this.menu_name[i] = 'Veg Mini Grilled Sandwich';
                            this.menu_price[i] = 30;
                            if(this.cartData[i].cheese==1)
                            {
                                this.menu_price[i] = this.menu_price[i] + 10;   
                            }
                            this.menu_packaging[i] = 1.1;
                        }
                        if(this.cartData[i].menu_id == 34)
                        {
                            this.menu_name[i] = 'French Fries';
                            this.menu_price[i] = 32;
                            this.menu_packaging[i] = 1.7;
                        }
                        if(this.cartData[i].menu_id == 35)
                        {
                            this.menu_name[i] = 'Masala French Fries';
                            this.menu_price[i] = 42;
                            this.menu_packaging[i] = 1.7;
                        }
                        if(this.cartData[i].menu_id == 36)
                        {
                            this.menu_name[i] = 'Peri Peri French Fries';
                            this.menu_price[i] = 37;
                            this.menu_packaging[i] = 1.7;
                        }
                        if(this.cartData[i].menu_id == 37)
                        {
                            this.menu_name[i] = 'Veg Jumbo Sandwich + French Fries';
                            this.menu_price[i] = 60;
                            if(this.cartData[i].cheese==1)
                            {
                                this.menu_price[i] = this.menu_price[i] + 10;   
                            }
                            this.menu_packaging[i] = 0;
                        }
                        if(this.cartData[i].menu_id == 38)
                        {
                            this.menu_name[i] = 'Veg Mini Grilled Sandwich + French Fries';
                            this.menu_price[i] = 60;
                            if(this.cartData[i].cheese==1)
                            {
                                this.menu_price[i] = this.menu_price[i] + 10;   
                            }
                            this.menu_packaging[i] = 0;
                        }
                    }
                    for(var i=0;i<this.cartData.length;i++)
                    {
                        if(this.cartData[i].menu_id == 1)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 2)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 3)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 4)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                        }
                        if(this.cartData[i].menu_id == 5)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 6)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 7)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 8)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 9)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 10)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 11)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 12)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 13)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 14)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 15)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 16)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 17)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 18)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 19)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 20)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 21)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 22)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 23)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 24)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 25)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 26)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 27)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 28)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 29)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 30)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 31)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 32)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 33)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 34)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 35)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 36)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 37)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                        if(this.cartData[i].menu_id == 38)
                        {
                            this.eachMenuPrice[i] = this.menu_price[i] * this.cartData[i].qty; 
                            this.menu_packaging[i] = this.menu_packaging[i] * this.cartData[i].qty;
                            this.menu_packaging[i] = parseFloat((this.menu_packaging[i]).toFixed(2));
                        }
                    }
                    this.totalCartPrice = 0;
                    for(var i=0;i<this.eachMenuPrice.length;i++)
                    {
                        this.totalCartPrice = this.totalCartPrice + this.eachMenuPrice[i] + this.menu_packaging[i];
                        
                    }
                    console.log(this.totalCartPrice);
                    for(var i=0;i<this.cartData.length;i++)
                    {
                        if(this.cartData[i].spoon == 1)
                        {
                          console.log('2220');
                          this.spoonSelected[i] = true;
                          this.totalCartPrice = this.totalCartPrice + (this.cartData[i].qty * 0.4);
                        }
                    }
                    console.log(this.totalCartPrice);
                    //this.totalCartPrice = (this.totalCartPrice).toFixed(2);
                    var count = 0;
                    for(var i=0;i<this.cartData.length;i++)
                    {
                        count = count + this.cartData[i].qty;
                    }
                    this.qtyCount = count;
                    if(count<=3)
                        this.carryBagPrice = 1.5;
                    if(count>3)
                        this.carryBagPrice = 2;
                    var da = localStorage.getItem('discountApplied');
                    this.discountApplied = da;
                    console.log(da);
                    if(da==null || da=='false')
                      this.totalDiscountedCartPrice = this.totalCartPrice;
                    else
                    {
                      this.totalDiscountedCartPrice = this.totalCartPrice - Math.floor(this.totalCartPrice*(10/100));
                      this.discount = Math.floor(this.totalCartPrice*(10/100));
                      this.coupon_name = 'Referal Coupon';
                    }
                    console.log(this.totalCartPrice);
                    console.log(this.totalDiscountedCartPrice);
                    var cc = localStorage.getItem('coupon_id');
                    if(cc!=null)
                    {
                      this.discountApplied = 'true';
                      if(cc==1)
                      {
                        this.coupon_name = 'MOON70';
                        this.discount = Math.floor((this.totalCartPrice*70)/100);
                        if(this.discount>70)
                        {
                          this.totalDiscountedCartPrice = this.totalCartPrice - 70;
                          this.discount = 70;
                        }
                        else
                        {
                          this.totalDiscountedCartPrice = this.totalCartPrice - this.discount;
                        }
                      }
                      if(cc==2)
                      {
                        this.coupon_name = 'SAVE100';
                        this.discount = Math.floor((this.totalCartPrice*100)/100);
                        if(this.discount>100)
                        {
                          this.totalDiscountedCartPrice = this.totalCartPrice - 100;
                          this.discount = 100;
                        }
                        else
                        {
                          this.totalDiscountedCartPrice = this.totalCartPrice - this.discount;
                        }
                      }
                    }
                    if(this.carryBag=='true')
                    {
                      this.totalDiscountedCartPrice = this.totalDiscountedCartPrice + this.carryBagPrice;
                    }
                    if(this.tissue=='true')
                    {
                      this.totalDiscountedCartPrice = this.totalDiscountedCartPrice + (this.qtyCount*0.25);
                    }
                    var deliveryPrice = 0;
                    this.deliveryCharge = null;
                    for(var i=0;i<this.cartData.length;i++)
                    {
                        if(this.cartData[i].menu_id==22 || this.cartData[i].menu_id==23 || this.cartData[i].menu_id==25 || this.cartData[i].menu_id==7 || this.cartData[i].menu_id==8 || this.cartData[i].menu_id==9)
                        {
                            deliveryPrice = deliveryPrice + this.eachMenuPrice[i];
                        }
                    }
                    if(this.totalCartPrice-deliveryPrice<100)
                    {
                        this.deliveryCharge = 'true';
                        this.totalDiscountedCartPrice = this.totalDiscountedCartPrice + 5;
                        console.log('a');
                    }
                    else if(deliveryPrice==null && this.totalDiscountedCartPrice<100)
                    {
                        this.deliveryCharge = 'true';
                        console.log('b');
                    }
                    else if(deliveryPrice==0)
                    {
                        this.deliveryCharge = 'false';
                        console.log('c');
                    }
                    else
                    {
                        this.deliveryCharge = 'false';
                        console.log('d');
                    }
                    //console.log(deliveryPrice);
                    this.totalCartPrice = (this.totalCartPrice).toFixed(2);
                    this.totalDiscountedCartPrice = (this.totalDiscountedCartPrice).toFixed(2);
                    this.roundup = this.totalDiscountedCartPrice;
                    var decimals = this.totalDiscountedCartPrice - Math.floor(this.totalDiscountedCartPrice);
                    if(decimals<0.5)
                      this.totalDiscountedCartPrice = Math.floor(this.totalDiscountedCartPrice);
                    if(decimals>=0.5)
                      this.totalDiscountedCartPrice = Math.ceil(this.totalDiscountedCartPrice);
                    console.log(this.totalDiscountedCartPrice);
                    //console.log(this.deliveryCharge);
                }
                this.preloader = false;
            }).catch(function(error){
                if (error.response.data.message != undefined)
                    console.log(error.response.data.message);
                else
                    alert('system error found,please try again');
            });
        },
		changeQty(value)
		{
            var d = new Date();
            var date = d.getDate();
			if(value==0)
            {
              this.preloader = true;
                this.deleteMenuFromCart(this.index);
            }
            else
            {
                this.cartData[this.index].qty = value;
                this.eachMenuPrice[this.index] = this.cartData[this.index].qty* this.menu_price[this.index];
                this.addToCart(this.index);
                this.totalCartPrice = 0;
                for(var i=0;i<this.eachMenuPrice.length;i++)
                {
                    this.totalCartPrice = this.totalCartPrice + this.eachMenuPrice[i];
                }var offerDate = localStorage.getItem('offerDate');
                console.log(this.discountApplied);
                    if(this.discountApplied==true)
                    {
                        var discount = Math.floor((this.totalCartPrice*20)/100);   
                        this.totalDiscountedCartPrice = this.totalCartPrice - discount;
                        this.discount = discount;
                        console.log('hj');
                    }else
                    {
                        this.totalDiscountedCartPrice = this.totalCartPrice - 0;
                    }
                    var deliveryPrice = 0;
                    this.deliveryCharge = null;
                    for(var i=0;i<this.cartData.length;i++)
                    {
                        if(this.cartData[i].menu_id==22 || this.cartData[i].menu_id==23 || this.cartData[i].menu_id==25 || this.cartData[i].menu_id==7 || this.cartData[i].menu_id==8 || this.cartData[i].menu_id==9)
                        {
                            deliveryPrice = deliveryPrice + this.eachMenuPrice[i];
                        }
                    }
                    if(this.totalDiscountedCartPrice-deliveryPrice<99)
                    {
                        this.deliveryCharge = 'true';
                        this.totalDiscountedCartPrice = this.totalDiscountedCartPrice + 5;
                    }
                    else if(deliveryPrice==null && this.totalCartPrice<99)
                    {
                        this.deliveryCharge = 'true';
                    }
                    else if(deliveryPrice==null)
                    {
                        this.deliveryCharge = 'false';
                    }
                    console.log(deliveryPrice);
                    console.log(this.totalDiscountedCartPrice);
                    console.log(this.deliveryCharge);
            }
		},
        addToCart(index)
        {
            console.log(this.cheese);
            axios({
                method: 'POST',
                url: 'addToCart2',
                data: {
                  menu_id: this.cartData[this.index].menu_id,
                  qty:this.cartData[this.index].qty,
                  mobile:localStorage.getItem('loginmobile'),
                  cheese:this.cheese
                }
            }).then(response => {
                console.log(response);
                this.getUserCart();
            },(error) => {
                if (error.response.data.message != undefined) {
                  alert(error.response.data.message);
                }
                else {
                  alert('connection error found,please retry again');
                }
            });
        },
        deleteMenuFromCart(index)
        {
            //console.log(this.cartData[this.index].menu_id);
            //console.log(localStorage.getItem('loginmobile'));
            axios({
                method: 'POST',
                url: 'deleteMenuFromCart2',
                data: {
                  menu_id: this.cartData[this.index].menu_id,
                  mobile:localStorage.getItem('loginmobile'),
                  cheese:this.cheese
                }
            }).then(response => {
                //console.log(response);
                this.preloader = true;
                this.totalCartPrice = 0;
                this.eachMenuPrice = [];
                //console.log(this.totalCartPrice);
                this.getUserCart();
                //console.log(this.cartData[0].qty);
            },(error) => {
                if (error.response.data.message != undefined) {
                  alert(error.response.data.message);
                }
                else {
                  alert('connection error found,please retry again');
                }
            });
        },
        getIndex(index,cheese)
        {
            this.index = index;
            this.cheese = cheese;
        }
	}
};
</script>

<style scoped>
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