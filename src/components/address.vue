<template>
	<f7-page>
	<offline @detected-condition="handleConnectivityChange"></offline>
		<div v-if="toast_msg != null" class="custom_toast z-depth-3">
    		{{ toast_msg }}
    	</div>
    		
    	<div>
			<p style="color:#000000;margin:16px 24px 5px 18px;font-size:32px;font-weight:bold">
			<a href="/account" class="link icon-only" style="color: #000000;height:43px;margin-right:10px"><f7-icon f7="chevron_left"></f7-icon></a>
				Address</p>
	        <f7-block style="margin:12px 8px;padding:0px">
	            <f7-block-title style="margin:0px;padding:16px 10px;color:#000000">
	      			<h5 class="mpzero" style="font-size:18px;font-weight:bold">Default Address</h5>
	      			<f7-button popup-open=".editadd" @click="addNewBtn" outline color="black" style="font-size:18px;font-weight:bold;position:absolute;right:10px;top:6px;text-transform:capitalize">+ Add New</f7-button>
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
			    <f7-block v-show="length>0" style="padding:0px;margin:10px">
			        <f7-list no-hairlines no-hairlines-between style="margin:0px">
			        	<template v-for="(result,id) in address">
			            	<f7-card v-show="result.deleted_at==null" style="width: 100%;-webkit-box-shadow:none;box-shadow:none;border-radius:4px;border:1px solid gray;margin:16px 0px">
            					<f7-card-content style="margin:0px;padding:10px;color:gray">
              						<h4 class="mpzero" style="color:#000000;font-size:16px">Name : {{result.first_name}} {{result.last_name}}</h4>
              						<h5 class="mpzero" style="font-size:14px">Detail Address : {{result.address}}</h5>
              						<h5 class="mpzero" style="font-size:14px">Area : {{result.area}}</h5>
            					</f7-card-content>
            					<f7-card-footer>
            						<f7-segmented style="width:100%">
              							<f7-button popup-open=".editadd" @click="editaddForm(result)" color="green" style="font-size:16px;font-weight:bold;text-transform:capitalize">Edit</f7-button>
              							<f7-button @click="deleteadd(result.id)" color="red" style="font-size:16px;font-weight:bold;text-transform:capitalize">Delete</f7-button>
            						</f7-segmented>
            					</f7-card-footer>
        					</f7-card>
			            </template>
			        </f7-list>
			    </f7-block>
	        </f7-block>
	        <f7-popup class="editadd" v-show="popupActive==true">
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
				          		<f7-button @click="saveadd" popup-close style="background-color:#FFCC00;color:#000000;height:100%;font-size:18px;font-weight:bold;border:0px;margin:0px;text-transform:capitalize" fill large>Save</f7-button>
				        		</f7-button>
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
		    save_status:null,
		    preloader:true,
		    popupActive:false,
		    length:null,
		    internet:null,
            status:'not shown'
		}
	},
	components: {
        offline
    },
	watch:{
    	active_address:function(){
      		if(this.active_address != null)
      		{
        		this.disabled = false;
      		}	
    	}
  	},
	mounted()
	{
		this.getadd();
	},
	methods:{
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
		editaddForm:function(address)
	    {
	    	this.popupActive = true;
	      this.fname = address.first_name;
	      this.lname = address.last_name;
	      this.user_address = address.address;
	      this.area = address.area;
	      this.address_id = address.id;
	      this.save_status = 'editadd';
	    },
	    addNewBtn()
	    {
	    	this.popupActive = true;
	    	this.clearData();
	    	this.save_status = 'addnew';
	    },
    saveadd:function(){

      	this.address = null;
      	this.preloader = true;
      if(this.save_status == 'addnew')
      {
        this.addnew();
      }
      else if(this.save_status == 'editadd')
      {
        this.editadd();
      }
      else
      {

      }
    },
		addnew:function()
	    {
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
	        this.length = this.address.length;
	        console.log(this.address);
	        this.preloader = false;
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
	    editadd:function(){
      this.preloader = true;
      axios({
        method:'POST',
        url : 'user/editAddress',
        data:{
          'first_name':this.fname,
          'last_name':this.lname,
          'mobile':localStorage.getItem('loginmobile'),
          'address':this.user_address,
          'area':this.area,
          'address_id':this.address_id
        }
      }).then(response => {
      	console.log(response);
      	this.popupActive = false;
        this.toast_msg = 'address successfully updated';
        setTimeout(() => {
          this.toast_msg = null;
        },2000);
        this.clearData();
        this.getadd();
      }).catch(error => {
        if(error.response.data.message != undefined)
          alert(error.response.data.message);
        else
          alert('failed to update address');
      });
    },
    deleteadd:function(id)
    {
    	const app = this.$f7;
        app.dialog.confirm('Are You Really Want to Delete this address?','Delete Address', () => {
	      this.preloader = true;
	      this.address = null;
	      axios({
	      method:'POST',
	        url : 'user/deleteaddress',
	        data:{
	          'address_id':id
	        }
	      }).then(response => {
	        this.toast_msg = 'Address Successfully Deleted';
	        setTimeout(() => {
	          this.toast_msg = null;
	        },2000);
	        this.getadd();
	      }).catch(error => {
	        if(error.response.data.message != undefined)
	          alert(error.response.data.message);
	        else
	          alert('failed to delete address');
	      });
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
</style> 