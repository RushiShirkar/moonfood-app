<template>
	<f7-page>
		<p style="color:#000000;margin:16px 24px 16px 18px;font-size:32px;font-weight:bold">
			<a href="/account" class="link icon-only" style="color: #000000;height:43px;margin-right:10px"><f7-icon f7="chevron_left"></f7-icon></a>
			Reward Coupons
		</p>
		<div style="padding:10px 20px 0px 20px">
			<a>
                        <img src="../assets/referral_banner.png" alt="" style="width:100%;border-radius:8px"></img>
                  </a>
		</div>
		<f7-block style="margin:0px;padding:0px">
      		<f7-row style="margin:20px 20px">
      			<f7-col>
      				<div style="width:100%; border-radius:8px;border:2px solid #FFCC00;padding:10px 0px">
      				 <center>
      					<div style="padding:10px; width:40px; height:40px; border-radius:50%; background-color:#eaf1f8">
      						<img src="../assets/gift.svg" alt="" style="width:30px;height:30px"></img>
      					</div>
      					<p style="margin:10px 0px 5px 0px">Referral Coupons</p>
      					<p style="font-size:22px;font-weight:bold;margin:0px 0px 5px 0px">{{discount}}</p>
      					<p style="margin:10px 0px 5px 0px">Flat 10% OFF</p>
      				 </center>
      				</div>
      			</f7-col>
      			<f7-col>
      				<div style="width:100%; border-radius:8px;border:2px solid #FFCC00;padding:10px 0px">
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
export default{
      data()
      {
            return{
                  discount:null,
                  loginmobile:localStorage.getItem("loginmobile")
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
            }
      }
}
</script>

<style scoped>
.f7-icons{
      font-size:32px !important;
}
</style>