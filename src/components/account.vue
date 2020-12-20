<template>
	<f7-page>
		<p style="color:#000000;margin:16px 24px 16px 18px;font-size:32px;font-weight:bold">
			<a href="/home" class="link icon-only" style="color: #000000;height:43px;margin-right:10px"><f7-icon f7="chevron_left"></f7-icon></a>
			Account
		</p>
		<f7-block style="margin:0px;padding:0px">
      		<f7-row style="padding:20px 0px;margin:0px 20px;border-bottom:1px solid #FFCC00">
      			<f7-col width="25" style="text-align:right">
      				<f7-icon f7="icon-person" style="font-size:50px !important;color:#000000"></f7-icon>
      			</f7-col>
      			<f7-col width="75">
      				<h3 class="mpzero" style="color:#000000;font-size:20px;line-height:50px">Hello User</h3>
      			</f7-col>
      		</f7-row>
      		<f7-list no-hairlines no-hairlines-between style="margin:15px 20px">
		        <f7-list-item link="/reward_coupons" style="padding:8px 0px">
		          <div style="font-weight:bold;color:#000000;font-size:18px" class="mpzero">&nbsp Your reward coupons</div>
		        </f7-list-item>
		        <f7-list-item link="/address" style="padding:8px 0px">
		          <div style="font-weight:bold;color:#000000;font-size:18px" class="mpzero">&nbsp Your address</div>
		        </f7-list-item>
			</f7-list>
    	</f7-block>
	    <div style="position:fixed;bottom:0px;left:0px;width:100%;z-index:99">
	    <f7-button @click="logout" href="/login" style="background-color:#FFCC00;color:#000000;height:100%;;font-size:18px;font-weight:bold;border:0px;margin:15px;text-transform:capitalize;height:56px;line-height:56px" fill large>Logout</f7-button>
	    </div>
	</f7-page>
</template>

<script>
import axios from '../axios';
export default{
	data()
	{
		return{
			discount:null
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
	        console.log(this.discount);
	      }).catch(error => {
	        if (error.response.data.message != undefined)
	          alert(error.response.data.message);
	        else
	          alert('system error found,please try again');
	      });
		},
		logout()
		{
			localStorage.removeItem('local_id');
      		localStorage.removeItem('token');
      		localStorage.removeItem('loginmobile');
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
</style>