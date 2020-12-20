<template>
	<f7-page>
		<p style="color:#000000;margin:16px 24px 5px 18px;font-size:32px;font-weight:bold">
		<a href="/cart" class="link icon-only" style="color: #000000;height:43px;margin-right:10px"><f7-icon f7="chevron_left"></f7-icon></a>
		Coupon Code</p>
		<f7-block style="padding:0px 20px">
		  <p v-show="couponError!=null" style="padding-left:20px;color:red">{{couponError}}</p>
              <f7-row no-gap style="background-color:#FFFFFF;border-radius:5px;margin:16px 0px 0px;border:1px solid #000000">
	          <f7-col width="70">
	              <f7-list no-hairlines-md style="margin:2px">
	                <f7-list-input label="Enter Coupon Code" floating-label type="text" @input="code = $event.target.value" clear-button style="text-align:left">
	                </f7-list-input>
	              </f7-list>
	          </f7-col>
	          <f7-col width="30" style="height:70px;padding:10px 10px 10px 5px">
	            <f7-link v-show="loader==false" @click="applyCoupon(1,$f7router,'/cart')" class="button button-fill" style="background-color:#FFCC00;color:#000000;font-weight:bold;text-transform:capitalize;height:100%;line-height:50px" fill>Apply</f7-link>
                  <f7-link v-show="loader==true" class="button button-fill" style="background-color:#FFCC00;color:#000000;font-weight:bold;text-transform:capitalize;height:100%;line-height:50px" fill><f7-preloader></f7-preloader></f7-link>
	          </f7-col>
	        </f7-row>
		</f7-block>
		<f7-block style="margin:0px;padding:0px">
      		<f7-row style="margin:20px 20px">
      			<f7-col>
      				<div style="width:100%; border-radius:8px;border:1px solid #000000;padding:10px 0px">
      				 <center>
      					<div style="padding:10px; width:40px; height:40px; border-radius:50%; background-color:#eaf1f8">
      						<img src="../assets/gift.svg" alt="" style="width:30px;height:30px"></img>
      					</div>
      					<p style="margin:10px 0px 5px 0px">Referral Coupons</p>
      					<p style="font-size:22px;font-weight:bold;margin:0px 0px 5px 0px">{{discount}}</p>
      					<p style="margin:10px 0px 5px 0px">Flat 10% OFF</p>
      					<f7-link @click="applyCoupon(2,$f7router,'/cart')" v-show="discount>0 && loader==false" class="button button-fill" style="margin:10px 10px 0px;background-color:#FFCC00;color:#000000;font-weight:bold;text-transform:capitalize" fill>Apply</f7-link>
                                    <f7-link v-show="loader==true && discount>0" class="button button-fill" style="margin:10px 10px 0px;background-color:#FFCC00;color:#000000;font-weight:bold;text-transform:capitalize" fill>Apply</f7-link>
      				 </center>
      				</div>
      			</f7-col>
      			<f7-col>
      				<div style="width:100%; border-radius:8px;border:1px solid #000000;padding:10px 0px">
      				 <center>
      					<div style="padding:10px; width:40px; height:40px; border-radius:50%; background-color:#eaf1f8">
      						<img src="../assets/gift.svg" alt="" style="width:30px;height:30px"></img>
      					</div>
      					<p style="margin:10px 0px 5px 0px">Feedback Coupons</p>
      					<p style="font-size:22px;font-weight:bold;margin:0px 0px 5px 0px">0</p>
      					<p style="margin:10px 0px 5px 0px;color:green">Coming Soon</p>
      				 </center>
      				</div>
      			</f7-col>
      		</f7-row>
      	</f7-block>
	</f7-page>
</template>

<script>
import axios from '../axios';
export default
{
      data()
      {
            return{
                  discount:null,
                  code:null,
                  required:null,
                  couponError:null,
                  loader:false
            };
      },
      mounted()
      {
            this.getDiscountNo();
      },
      methods:
      {
            getDiscountNo()
            {
                  axios({
                        method:'GET',
                        url : '/getDiscountNo/'+localStorage.getItem('loginmobile')
                  }).then(response => {
                        this.discount=response.data.result[0].discount;
                        if(this.discount==null || this.discount<0)
                        {
                              this.discount = 0;
                        }
                        console.log(this.discount);
                  }).catch(error => {
                        if (error.response.data.message != undefined)
                              alert(error.response.data.message);
                        else
                              alert('system error found,please try again');
                  });
            },
            applyCoupon(index,route,path)
            {
                  if(index==1)
                  {
                        if(this.code==null || this.code=='')
                        {

                        }
                        else
                        {
                              this.loader = true;
                              axios({
                                    method:'GET',
                                    url : 'checkCoupon/'+localStorage.getItem('loginmobile')+'/'+this.code
                              }).then(response => {
                                    console.log(response.data.result);
                                    route.navigate(path);
                                    localStorage.setItem('coupon_id',response.data.result);
                                    localStorage.setItem('coupon_code',this.code);
                              }).catch(error => {
                                    if (error.response.data.message != undefined)
                                    {
                                          this.loader = false;
                                          this.couponError = 'Enter valid coupon code';
                                    }
                                    else
                                          alert('system error found,please try again');
                              });
                        }
                  }
                  if(index==2)
                  {
                        this.loader = true;
                        localStorage.setItem('discountApplied',true);
                        route.navigate(path);
                  }
            }
      }
};
</script>

<style scoped>
.f7-icons{
	font-size:32px !important;
}
</style>