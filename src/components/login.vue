<template>
	<f7-page>
    <offline @detected-condition="handleConnectivityChange"></offline>
    <center style="height:100%">
      <div style="height:100%" v-show="showImage==true">
        <img src="../assets/opening-banner.png" style="width:100%;height:100%" alt="">
      </div>
      <f7-block v-show="showImage==true" style="position:absolute;bottom:150px;left:0px;width:100%">
        <h1 style="float:right;color:#FFFFFF;margin-bottom:0px">Everyday Low Price</h1>
        <p style="float:right;color:#FFCC00;margin:0px;font-size:20px">Save Money. Eat Better.</p>
      </f7-block>
      <f7-block v-show="showImage==true && showRefer==false" style="position:absolute;bottom:25px;left:0px;width:100%;margin:0px">
        <p v-show="mobileCheck==false" style="margin:0px;color:#FFFFFF;font-size:14px;text-align:left">Currently Delivery upto 2Km from CSIBER Chowk</p>
        <p v-show="mobileError!=null" style="margin:8px 0px 0px;color:#ff6b00;text-align:left">{{mobileError}}</p>
        <f7-row no-gap style="background-color:#FFFFFF;border-radius:5px;margin:16px 0px 0px">
          <f7-col width="80">
              <f7-list no-hairlines-md style="margin:2px">
                <f7-list-input label="Enter Mobile Number" floating-label type="number" @input="mobile = $event.target.value" clear-button style="text-align:left">
                </f7-list-input>
              </f7-list>
          </f7-col>
          <f7-col width="20" style="height:70px;padding:10px 10px 10px 5px">
            <f7-link @click="login" class="button button-fill" style="background-color:#FFCC00;height:100%;line-height:50px" fill><f7-icon f7="chevron_right"></f7-icon></f7-link>
          </f7-col>
        </f7-row>
      </f7-block>
      <f7-block v-show="mobileCheck==true && showImage==true && showRefer==false" style="position:absolute;bottom:25px;left:0px;width:100%;margin:0px">
        <f7-row>
          <f7-col style="color:#FFFFFF;font-size:16px;font-weight:bold;text-align:left">
            +91 {{mobile}}
          </f7-col>
          <f7-col style="text-align:right">
            <a href="javascript:void(0)" @click="editNumber" style="color:#FFCC00;font-size:16px;font-weight:bold">Edit Number</a>
          </f7-col>
        </f7-row>
        <p v-show="otpSend!=null" style="margin:6px 0px 0px 0px;color:#5ce81f;text-align:left">{{otpSend}}</p>
        <p v-show="otpError!=null" style="margin:6px 0px 0px 0px;color:#ff6b00;text-align:left">{{otpError}}</p>
        <f7-row no-gap style="background-color:#FFFFFF;border-radius:5px;margin:16px 0px 0px">
          <f7-col width="80">
            <f7-row no-gap>
              <f7-col width="60">
                <f7-list no-hairlines-md style="margin:2px">
                  <f7-list-input label="Enter OTP" floating-label type="number" @input="otp = $event.target.value" placeholder="4 Digit OTP" clear-button style="text-align:left">
                  </f7-list-input>
                </f7-list>
              </f7-col>
              <f7-col width="40" style="height:70px;text-align:left">
                <a href="javascript:void(0)" @click="resendOtp" style="color:#FFCC00;font-size:16px;font-weight:bold;line-height:70px">Resend OTP</a>
              </f7-col>
            </f7-row>
          </f7-col>
          <f7-col width="20" style="height:70px;padding:10px 10px 10px 5px">
            <f7-link @click="openHome($f7router,'/home')" class="button button-fill" style="background-color:#FFCC00;height:100%;line-height:50px" fill><f7-icon f7="chevron_right"></f7-icon></f7-link>
          </f7-col>
        </f7-row>
      </f7-block>
     
      <f7-block v-show="showRefer==true && activateRefer==true" style="position:absolute;bottom:25px;left:0px;width:100%;margin:0px">
        <f7-row>
          <f7-col style="color:#FFFFFF;font-size:16px;font-weight:bold;text-align:left">
            Get Referral Bonus
          </f7-col>
          <f7-col style="text-align:right">
            <a href="/home" @click="cancelRefer" style="color:#FFCC00;font-size:16px;font-weight:bold">Skip (Go to home)</a>
          </f7-col>
        </f7-row>
        <p style="margin:6px 0px 0px 0px;color:#ff6b00;text-align:left">{{referalError}}</p>
        <f7-row no-gap style="background-color:#FFFFFF;border-radius:5px;margin:16px 0px 0px">
          <f7-col width="80">
              <f7-list no-hairlines-md style="margin:2px">
                <f7-list-input label="Enter Referral Mobile Number" floating-label type="number" @input="referal = $event.target.value" clear-button style="text-align:left">
                </f7-list-input>
              </f7-list>
          </f7-col>
          <f7-col width="20" style="height:70px;padding:10px 10px 10px 5px">
            <f7-link @click="getCashback" class="button button-fill" style="background-color:#FFCC00;height:100%;line-height:50px" fill><f7-icon f7="chevron_right"></f7-icon></f7-link>
          </f7-col>
        </f7-row>
      </f7-block>
      <f7-block v-show="showRefer==true && activateRefer==false && activateCashback==true" style="position:absolute;bottom:25px;left:0px;width:100%;margin:0px">
        <f7-row>
          <f7-col width="30">
            <img src="../assets/gift.svg" alt=""></img>
          </f7-col>
          <f7-col width="70">
            <p style="margin:0px;color:#FFFFFF;font-size:16px;font-weight:bold;text-align:left">Congratulations !<br><span style="font-weight:normal">You got 10% OFF coupon</span></p>
          </f7-col>
        </f7-row>
        <div style="margin:16px 0px 0px; padding:0px 0px 10px 0px">
          <f7-button href="/home" @click="gotoHome" style="background-color:#000000;color:#FFCC00;height:100%;font-size:18px;font-weight:bold;margin:0px;border:1px solid #FFCC00;text-transform:capitalize" fill large>Enjoy Delicious Food<f7-icon f7="chevron_right" style="margin:-5px 0px 0px 10px"></f7-icon></f7-button>
        </div>
      </f7-block>
    </center>
	</f7-page>
</template>

<script>
import { f7Navbar, f7Page, f7Block, f7Button, f7Label } from 'framework7-vue';
import axios from '../axios';
import offline from 'v-offline';
export default {
  data() {
    return {
      mobile:null,
      mobileCheck:false,
      mobileError:null,
      otp:null,
      otpSend:null,
      otpError:null,
      btn_text:'Get OTP',
      name:null,
      internet:null,
      status:'not shown',
      userStatus:null,
      showImage:true,
      showRefer:false,
      activateRefer:false,
      activateCashback:false,
      referal:null,
      referalError:null
    }
  },
  components: {
    offline
  },
  mounted()
  {

  },
  methods:{
    gotoHome()
    {
       const self = this;
        self.$f7.dialog.preloader('Entering Delicious World');
        setTimeout(() => {
              self.$f7.dialog.close();
            }, 2000);
    },
    getCashback()
    {
      if(this.referal==null || this.referal=='' || this.referal.length!=10)
      {
        this.referalError = "Enter valid referal number";
      }
      else
      {
        axios({
              method: 'POST',
              url: 'sendReferal',
              data: {referal: this.referal,mobile:localStorage.getItem('loginmobile')}
            }).then(response => {
              console.log(response.data.result);
              this.activateRefer = false;
              this.activateCashback = true;
            }, (error) => {
              if (error.response.data.message != undefined) {
                this.referalError = error.response.data.message;
              }
              else {
                alert('connection error found,please retry again');
              }
            }
          );
      }
    },
    cancelRefer(route,path)
    {
      this.gotoHome();
      route.navigate(path);
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
    login()
    {
      if(this.mobileCheck==false)
      {
        if(this.mobile==null || this.mobile=='' || this.mobile.length!=10 || this.mobile.includes('e') || this.mobile.includes('+'))
        {
          this.mobileError = 'Enter valid mobile number';
        }
        else
        {
          const self = this;
          self.$f7.dialog.preloader('Sending OTP');
          axios({
            method: 'POST',
            url: 'api/auth/sendOtp',
            data: {mobile: this.mobile}
          }).then(response => {
            console.log(response);
            this.userStatus = response.data.result;
            this.otpSend = 'OTP sent to your mobile number';
            this.otpError = null;
            setTimeout(() => {
              self.$f7.dialog.close();
            }, 1000);
          },(error) => {
            if (error.response.data.message != undefined) {
              this.mobileError = error.response.data.message;
            }
            else {
              alert('connection error found,please retry again');
            }
          });
          this.mobileError = null;
          this.mobileCheck = true;
        }
      }
      else
      {
        if(this.otp==null || this.otp=='' || this.otp.length!=4 || this.otp.includes('e') || this.otp.includes('+'))
        {
          this.otpError = 'Enter valid otp';
        }
        else
        {
          axios({
            method: 'POST',
            url: 'api/auth/checkOtp',
            data: {mobile: this.mobile, code: this.otp}
          }).then(response => {
            console.log(response);
          },(error) => {
            if (error.response.data.message != undefined) {
              this.otpError = error.response.data.message;
            }
            else {
              alert('connection error found,please retry again');
            }
          });
        }
      }
    },
    openHome(route,path)
    {
      console.log('j');
      if(this.otp==null || this.otp=='' || this.otp.length!=4 || this.otp.includes('e') || this.otp.includes('+'))
        {
          this.otpError = 'Enter valid otp';
          this.otpSend = null;
        }
        else
        {
          axios({
            method: 'POST',
            url: 'api/auth/checkOtp',
            data: {mobile: this.mobile, code: this.otp}
          }).then(response => {
            console.log(response);
            localStorage.setItem('loginmobile',this.mobile);
            localStorage.setItem('token',response.data.result);
            localStorage.setItem('local_id',response.data.result);
            if(this.userStatus == 'new')
            {
              this.showRefer = true;
              this.activateRefer = true;
            }
            else
            {
              const self = this;
              self.$f7.dialog.preloader('Entering Delicious World');
              setTimeout(() => {
                    self.$f7.dialog.close();
                  }, 2000);
              route.navigate(path);
            }
          },(error) => {
            if (error.response.data.message != undefined) {
              this.otpSend = null;
              this.otpError = error.response.data.message;
            }
            else {
              alert('connection error found,please retry again');
            }
            self.$f7.dialog.close();
          });
        }
    },
    resendOtp()
    {
      axios({
        method: 'POST',
        url: 'api/auth/sendOtp',
        data: {mobile: this.mobile}
      }).then(response => {
        this.otpSend = 'OTP Resent to your mobile number';
        this.otpError = null;
      },(error) => {
        if (error.response.data.message != undefined) {
          this.mobileError = error.response.data.message;
        }
        else {
          alert('connection error found,please retry again');
        }
      });
    },
    editNumber(){
      this.mobileError = null;
      this.mobileCheck = false;
      this.otpSend = null;
      this.otp = null;
    }
  }
}
</script>
<style scoped>
  ::-webkit-scrollbar {
    display: none;
    -moz-appearance: none;
   }
  .cat_width{
    width: 90px
  }
  .cat_width2{
    width:124px
  }
  .prod_width{
    width: 150px
  }
  @media only screen and (max-width: 350px){
   .cat_width{
    width: 80px !important
  }
  }
  .color{
    background-color:green;
  }
  .color1{
    background-color:#323232;
    bottom:0px
  }
  .checked {
  color: orange;
}
</style>

