<template>
  <f7-page>
    <offline @detected-condition="handleConnectivityChange"></offline>
    <div v-if="toast_msg != null" class="custom_toast z-depth-3">
        {{ toast_msg }}
    </div>
    <f7-row style="margin:24px 18px 20px 18px">
      <f7-col width="15">
        <img src="../assets/moonfood_icon.png" style="height:45px;width:40px" alt="">
      </f7-col>
      <f7-col width="85">
        <p style="margin:0px;font-size:16px;font-weight:bold">MOONFOOD</p>
        <p v-show="statusText=='Open Now'" style="color:green;margin:0px;font-size:15px;font-weight:bold">{{statusText}}<span style="text-transform:capitalize;font-size:14px;font-weight:normal;color:red"> ({{openingText}})</span></p>
        <p v-show="statusText=='Closed Now'" style="color:red;margin:0px;font-size:15px;font-weight:bold">{{statusText}}<span style="text-transform:capitalize;font-size:14px;font-weight:normal;color:green"> ({{openingText}})</span></p>
      </f7-col>
    </f7-row>
    <div v-show="appVersion!='1.0.16' && appVersion!=null" style="margin:0px 18px 24px 18px">
      <a class="link external button button-fill button-large" href="https://play.google.com/store/apps/details?id=in.moonfood.android" style="background-color:#FFCC00;color:#000000;height:100%;width:100%;font-size:18px;font-weight:bold;border:0px;margin:0px;text-transform:capitalize;height:56px;line-height:56px">
      New Update Available <f7-icon f7="chevron_right" style="margin:0px 0px 0px 10px"></f7-icon>
      </a>
    </div>
    <f7-block v-if="completed==0" style="margin:24px 18px 26px 18px;padding:0px">
      <f7-row no-gap>
        <f7-col width="35" style="text-align:center;height:151px;background-color:#000000;color:#FFCC00;border:2px solid #000000;border-radius:8px 0px 0px 8px"> 
          <img src="../assets/food_delivery.svg"alt="" style="margin-top:24px">
          <p style="text-align:center;font-weight:bold;margin-top:8px">Live Order</p>
        </f7-col>
        <f7-col width="65" style="background-color:#FFFFFF;color:#000000;border:2px solid #000000;border-radius:0px 8px 8px 0px"> 
          <div class="timeline" style="margin:16px 0px">
            <div class="timeline-item">
              <div class="timeline-item-divider" style="background:green"></div>
              <div v-show="orders[0].status==1" class="timeline-item-content blinking" style="color:green;font-weight:bold">Food is preparing</div>
              <div v-show="orders[0].status==2 || orders[0].status==3" class="timeline-item-content" style="color:green;font-weight:bold">Food is preparing</div>
            </div>
            <div class="timeline-item">
              <div v-if="orders[0].status==1" class="timeline-item-divider"></div>
              <div v-else class="timeline-item-divider" style="background:green"></div>
              <div v-show="orders[0].status==1" class="timeline-item-content" style="color:#757575">Delivery on way</div>
              <div v-show="orders[0].status==2" class="timeline-item-content blinking" style="color:green;font-weight:bold">Delivery on way</div>
              <div v-show="orders[0].status==3" class="timeline-item-content" style="color:green;font-weight:bold">Delivery on way</div>
            </div>
            <div class="timeline-item">
              <div v-if="orders[0].status==1 || orders[0].status==2" class="timeline-item-divider"></div>
              <div v-else class="timeline-item-divider" style="background:green"></div>
              <div v-show="orders[0].status==1 || orders[0].status==2" class="timeline-item-content" style="color:#757575">Near your area</div>
              <div v-show="orders[0].status==3" class="timeline-item-content blinking" style="color:green;font-weight:bold">Near your area</div>
            </div>
          </div>
        </f7-col>
      </f7-row>
    </f7-block>
    <div style="padding:0px 18px 0px 18px;overflow-x:scroll;overflow-y:hidden;white-space:nowrap;height:240px">
            <f7-link @click="openBannerSheet(1)" style="height:100%;border-radius:8px;margin-right:12px">
              <img src="../assets/1.png" style="height:100%;width:240px;border-radius:8px" alt="">
            </f7-link>
            <f7-link @click="openBannerSheet(2)" style="height:100%;border-radius:8px;margin-right:12px">
              <img src="../assets/2.png" style="height:100%;width:240px;border-radius:8px" alt="">
            </f7-link>
            <f7-link @click="openBannerSheet(3)" style="height:100%;border-radius:8px;margin-right:12px">
              <img src="../assets/3.png" style="height:100%;width:240px;border-radius:8px" alt="">
            </f7-link>
            <f7-link @click="openBannerSheet(4)" style="height:100%;border-radius:8px">
              <img src="../assets/4.png" style="height:100%;width:240px;border-radius:8px" alt="">
            </f7-link>
        </div>
        <div style="padding:26px 18px 0px 18px">
            <img src="../assets/referral_banner.png" alt="" style="width:100%;border-radius:8px"></img>
        </div>
        <f7-block v-show="ratingForm==true" style="border:2px solid #FFCC00;border-radius:8px;margin:24px 18px 26px 18px;padding:16px 0px">
          <h3 style="padding:0px 16px">Rate your previous order</h3>
          <star-rating @rating-selected="setRating" :star-size="30" :show-rating="false" padding="3" style="padding:5px 16px"></star-rating>
          <f7-list no-hairlines-md style="margin:10px 0px" v-show="submitButton==true">
                <f7-list-input label="Write your experience (Optional)" floating-label type="text" @input="feedback = $event.target.value" clear-button style="text-align:left">
                </f7-list-input>
          </f7-list>
          <f7-button btn fill large @click="saveFeedback" v-show="submitButton==true" style="background-color:#000000;color:#FFCC00;font-size:18px;font-weight:bold;text-transform:capitalize;margin:0px 16px">Submit</f7-button>
        </f7-block>
        <f7-row style="margin:14px 18px 70px 18px">
          <template v-for="(result,index) in types">
            <f7-col width="33" class="col_hgt" style="margin-bottom:18px">
             <f7-link @click="openSubMenus(index,result.name)" style="width:100%">
              <center>
                    <f7-card style="height:80px;width:80px;border-radius:60px">
                      <img v-show="index==0" src="../assets/paneer_roll.png" style="height:80px;width:80px;border-radius:60px" alt="">
                      <img v-show="index==1" src="../assets/chicken_roll.png" style="height:80px;width:80px;border-radius:60px" alt="">
                      <img v-show="index==2" src="../assets/veg_sandwich-toasted.png" style="height:80px;width:80px;border-radius:60px" alt="">
                      <img v-show="index==3" src="../assets/maggi.png" style="height:80px;width:80px;border-radius:60px" alt="">
                      <img v-show="index==4" src="../assets/bread-bhurji.png" style="height:80px;width:80px;border-radius:60px" alt="">
                      <img v-show="index==5" src="../assets/beverages.png" style="height:80px;width:80px;border-radius:60px" alt="">
                      <img v-show="index==6" src="../assets/ketchup.png" style="height:80px;width:80px;border-radius:60px" alt="">
                    </f7-card>
                    <span style="color:#000000;margin:0px;font-size:14px;font-weight:bold;display:inline-block">{{result.name}}</span>
                </center>
             </f7-link>
           </f7-col>
          </template>
        </f7-row>
        <a  class="link external" :href="'tel:' + 8600198512" style="position:fixed;bottom:80px;right:15px;height:56px;width;56px;z-index:999">
        <div style="width:56px;height:56px;border-radius:30px;background-color:#000000;color:#FFCC00;text-align:center;opacity:85%">
          <f7-icon f7="phone" style="margin:7px 0px 0px 0px"></f7-icon>
          <p style="margin:0px">Help</p>
        </div>
        </a>
        <f7-block style="position:fixed;bottom:0px;left:0px;width:100%;margin:0px;background-color:#FFFFFF;padding:10px 0px 5px 0px;box-shadow: 5px 0px 10px rgba(0, 0, 0, 0.12);text-align:center">
         <f7-row>
          <f7-link style="color:#000000" class="col">
              <f7-col>
                <img src="../assets/home.svg" alt="" style="margin-bottom:2px"></img>
                <p style="margin:0px">Home</p>
              </f7-col>
          </f7-link>
          <f7-link @click="openCartPage($f7router,'/cart')" style="color:#000000" class="col">
              <f7-col>
                <img src="../assets/cart.svg" alt=""><f7-badge v-show="cartData.length>0" color="black" style="position:absolute;margin:-5px 0px 0px -5px">{{cartData.length}}</f7-badge></img>
                <p style="margin:0px">Cart</p>
              </f7-col>
          </f7-link>
          <f7-link href="/orders" style="color:#000000" class="col">
              <f7-col>
                <img src="../assets/order_history.svg" alt=""><f7-badge v-show="activeOrders>0" color="black" style="position:absolute;margin:-5px 0px 0px -5px">{{activeOrders}}</f7-badge></img>
                <p style="margin:0px">Orders</p>
              </f7-col>
          </f7-link>
          <f7-link href="/account" style="color:#000000" class="col">
              <f7-col>
                <img src="../assets/user.svg" alt="" style="margin-bottom:2px"></img>
                <p style="margin:0px">Account</p>
              </f7-col>
          </f7-link>
         </f7-row>
        </f7-block>
        <f7-sheet ref="offersheet" class="loginsheet" style="height:auto">
          <f7-block-title style="margin:0px;padding:15px 15px 5px 15px;font-size:20px;font-weight:bold;line-height:40px;color:#000000">
            {{offerMenu}}
            <span style="font-size:20px;font-weight:bold;line-height:20px;color:#000000;background-color:#FFCC00;float:right;padding:10px;border-radius:3px">₹{{offerPrice}}</span>
          </f7-block-title>
          <f7-block style="margin:0px;padding:0px">
            <p style="padding:15px;margin:0px;font-size:18px">Combo Pack of {{offerMenu}}</p>
            <f7-row style="text-align:center;padding:15px 10px">
            <f7-col>
              <medium class="display-block" style="padding-bottom:5px">Number of Combo's</medium>
              <f7-stepper :value="offerQty" @stepper:change="setOfferQty" color="black" fill></f7-stepper>
            </f7-col>
            <f7-col>
              <f7-button v-show="offerLoader==false" fill large :disabled="addOfferBtn" @click="addToCart" style="background-color:#FFCC00;color:#000000;font-size:18px;font-weight:bold;border:0px;margin:15px 10px 0px 10px;text-transform:capitalize;line-height:48px">Add <f7-icon f7="chevron_right" style="margin:-5px 0px 0px 10px"></f7-icon></f7-button>
              <f7-button v-show="offerLoader==true" fill large style="background-color:#FFCC00;color:#000000;font-size:18px;font-weight:bold;border:0px;margin:15px 10px 0px 10px;text-transform:capitalize;line-height:48px"><f7-preloader></f7-preloader></f7-button>
            </f7-col>
          </f7-row>
          </f7-block>
        </f7-sheet>
        <f7-sheet ref="menusheet" style="height:85%;border-radius:12px 12px 0px 0px">
        <p style="font-size:20px;font-weight:bold;margin:24px 18px 24px 24px"><img v-show="veg==1" src="../assets/veg.png" style="height:23px;vertical-align: middle;"></img><img v-show="veg==0" src="../assets/non-veg.png" style="height:23px;vertical-align: middle;"></img>&nbsp <span style="display:inline-block;vertical-align: middle;">{{type}}</span></p>
        <f7-block style="padding:0px 18px 155px 18px;margin:0px;height:100%;overflow-y:scroll">
          <template v-for="(menu,index) in menus">
            <f7-card style="-webkit-box-shadow:none;box-shadow:none;margin:0px 0px 14px;border-radius:0px;border-bottom:1px solid #d9d9d9;padding-bottom:10px">
              <f7-row no-gap>
                <f7-col width="30" style="padding:8px 0px 4px 8px;text-align:left">
                  <img v-if="menu.menu_id==1" src="../assets/maggi.png" style="height:85px;width:100%;border-radius:8px" alt="">
                  <img v-if="menu.menu_id==2" src="../assets/omelette.png" style="height:85px;width:100%;border-radius:8px" alt="">
                  <img v-if="menu.menu_id==3 || menu.menu_id==10" src="../assets/olee-bhel.png" style="height:85px;width:100%;border-radius:8px" alt="">
                  <img v-if="menu.menu_id==5" src="../assets/bread-chilla.png" style="height:85px;width:100%;border-radius:8px" alt="">
                  <img v-if="menu.menu_id==6 || menu.menu_id==30 || menu.menu_id==31" src="../assets/bread-bhurji.png" style="height:85px;width:100%;border-radius:8px" alt="">
                  <img v-if="menu.menu_id==7" src="../assets/bread.png" style="height:85px;width:100%;border-radius:8px" alt="">
                  <img v-if="menu.menu_id==8" src="../assets/ketchup.png" style="height:85px;width:100%;border-radius:8px" alt="">
                  <img v-if="menu.menu_id==9" src="../assets/shev.png" style="height:85px;width:100%;border-radius:8px" alt="">
                  <img v-if="menu.menu_id==14" src="../assets/boiled-egg.png" style="height:85px;width:100%;border-radius:8px" alt="">
                  <img v-if="menu.menu_id==15" src="../assets/veg_roll.png" style="height:85px;width:100%;border-radius:8px" alt="">
                  <img v-if="menu.menu_id==16 || menu.menu_id==28 || menu.menu_id==29" src="../assets/paneer_roll.png" style="height:85px;width:100%;border-radius:8px" alt="">
                  <img v-if="menu.menu_id==17" src="../assets/omlette_roll-1.png" style="height:85px;width:100%;border-radius:8px" alt="">
                  <img v-if="menu.menu_id==18" src="../assets/omlette_roll-2.png" style="height:85px;width:100%;border-radius:8px" alt="">
                  <img v-if="menu.menu_id==24" src="../assets/s_maggi.png" style="height:85px;width:100%;border-radius:8px" alt="">
                  <img v-if="menu.menu_id==19 || menu.menu_id==26 || menu.menu_id==27" src="../assets/chicken_roll.png" style="height:85px;width:100%;border-radius:8px" alt="">
                  <img v-if="menu.menu_id==20" src="../assets/chicken-omlette_roll-1.png" style="height:85px;width:100%;border-radius:8px;margin-top:13px" alt="">
                  <img v-if="menu.menu_id==21" src="../assets/chicken-omlette_roll-2.png" style="height:85px;width:100%;border-radius:8px;margin-top:13px" alt="">
                  <img v-if="menu.menu_id==22" src="../assets/cocacola.png" style="height:85px;width:100%;border-radius:8px" alt="">
                  <img v-if="menu.menu_id==23" src="../assets/thumbs_up.png" style="height:85px;width:100%;border-radius:8px" alt="">
                  <img v-if="menu.menu_id==25" src="../assets/sprite.png" style="height:85px;width:100%;border-radius:8px" alt="">
                  <img v-if="menu.menu_id==32 || menu.menu_id==37" src="../assets/veg_sandwich.png" style="height:85px;width:100%;border-radius:8px" alt="">
                  <img v-if="menu.menu_id==33 || menu.menu_id==38" src="../assets/veg_sandwich-toasted.png" style="height:85px;width:100%;border-radius:8px;margin-top:13px" alt="">
                  <img v-if="menu.menu_id==34" src="../assets/french_fries.png" style="height:85px;width:100%;border-radius:8px" alt="">
                  <img v-if="menu.menu_id==35" src="../assets/masala-french_fries.png" style="height:85px;width:100%;border-radius:8px" alt="">
                  <img v-if="menu.menu_id==36" src="../assets/peri-french_fries.png" style="height:85px;width:100%;border-radius:8px" alt="">
                </f7-col>
                <f7-col width="70" style="padding:8px 0px 8px 18px">
                  <p style="font-size:18px;font-weight:bold;margin:0px 0px 10px 0px">{{menu.name}}</p>
                  <f7-row no-gap style="border-radius:5px">
                    <f7-col width="25" style="background-color:#FFCC00;border-radius:5px 0px 0px 5px">
                      <p style="color:#000000;height:35px;line-height:35px;font-size:18px;margin:0px;text-align:center">₹{{menu.price}}</p>
                    </f7-col>
                    <f7-col width="75" style="background-color:#000000;border-radius:0px 5px 5px 0px">
                      <p style="color:#FFFFFF;height:35px;line-height:35px;font-size:14px;margin:0px;text-align:center">Everyday Low Price</p>
                    </f7-col>
                  </f7-row>
                </f7-col>
              </f7-row>
              <f7-row no-gap style="margin-top:5px">
                    <f7-col width="60" style="padding-left:5px">
                      <f7-list v-if="menu.menu_id==1 || menu.menu_id==6 || menu.menu_id==15 || menu.menu_id==16 || menu.menu_id==17 || menu.menu_id==18 || menu.menu_id==19 || menu.menu_id==20 || menu.menu_id==21 || menu.menu_id==26 || menu.menu_id==27 || menu.menu_id==28 || menu.menu_id==29 || menu.menu_id==30 || menu.menu_id==31 || menu.menu_id==32 || menu.menu_id==33 || menu.menu_id==37 || menu.menu_id==38" style="margin-left:-10px;margin-top:-10px">
                    <f7-list-item checkbox class="my_checkbox" @change="selectCheese($event,index)" style="color:green;font-size:16px;font-weight:bold;" title="Cheese (₹10)"></f7-list-item>
                  </f7-list>
                    </f7-col>
                    <f7-col width="40" style="text-align:right">
                      <f7-stepper class="my_stepper" :min="0" :input-readonly="true" :value="qty[index]" @stepper:minusclick="minusQty($event,index)" @stepper:plusclick="plusQty($event,index)" color="black" raised small>
                      </f7-stepper>
                      <div v-if="loader[index]==1" style="width:125px;float:right;margin-top:-5px">
                        <f7-progressbar infinite color="yellow"></f7-progressbar>
                      </div>
                    </f7-col>
              </f7-row>
            </f7-card>
          </template>
        </f7-block>
        <f7-link @click="closeMenuSheet($f7router,'/cart')" style="width:100%;position:fixed;bottom:18px;z-index:99"> 
                <f7-card v-show="cartData.length>0 && cartItems>0" style="background-color:#FFCC00;color:#000000;font-size:18px;font-weight:bold;margin:0px;width:85%">
                  <f7-row no-gap style="padding:14px 18px">
                    <f7-col width="60">
                      <span>{{cartItems}} Items</span>&nbsp |&nbsp<span>₹{{cartPrice}}</span>
                    </f7-col>
                    <f7-col width="40" style="text-align:right">
                      View Cart
                    </f7-col>
                  </f7-row>
                </f7-card>
        </f7-link>
        </f7-sheet>
        <f7-sheet ref="banner1_sheet" style="height:auto;border-radius:12px 12px 0px 0px">
          <p style="font-size:20px;font-weight:bold;margin:24px 18px">100% OFF - If you find lower price than us</p>
          <f7-block style="padding:0px 18px;margin:0px;font-size:16px">
          <span style="font-weight:bold">Find Lower Price than us and get 100% OFF upto ₹100.</span>
          <p>
          <span style="font-weight:bold">Step 1 :</span> Tell us if you find lower price than us by clicking on button below.<br>
          <span style="font-weight:bold">Step 2 :</span> We will verify your information.<br>
          <span style="font-weight:bold">Step 3 :</span> Hurry! You will get coupon code of 100% Discount after verification on Whatsapp.<br>
          </p>
          <a class="link external button button-fill button-large" :href="'https://wa.me/91'+this.contact+'?text=I%20found%20lower%20prices%20than%20Moonfood'" style="background-color:#FFCC00;color:#000000;height:100%;font-size:18px;font-weight:bold;border:0px;margin:24px 0px 24px 0px;text-transform:capitalize" fill large>Claim Now</a> 
          </f7-block>
        </f7-sheet>
        <f7-sheet ref="banner2_sheet" style="height:auto;border-radius:12px 12px 0px 0px">
          <p style="font-size:20px;font-weight:bold;margin:24px 18px">70% OFF upto ₹70</p>
          <f7-block style="padding:0px 18px;margin:0px;font-size:16px">
          <span style="font-weight:bold">Share #I am Foodie Image on Instagram Story and get 70% OFF upto ₹70.</span>
          <p>
          <span style="font-weight:bold">Step 1 :</span> Download #I am Foodie image by clicking on button below and share it on Instagram Story.<br>
          <span style="font-weight:bold">Step 2 :</span> Tag Us in Story<br>
          <span style="font-weight:bold">Step 3 :</span> Hurry! You will get coupon code of 70% Discount next day in instagram message.<br>
          </p>
          <a v-show="downloadLoader==false" class="link external button button-fill button-large" @click="downloadImage" style="background-color:#FFCC00;color:#000000;height:100%;font-size:18px;font-weight:bold;border:0px;margin:24px 0px 24px 0px;text-transform:capitalize" fill large>Download Now</a> 
          <a v-show="downloadLoader==true" class="link external button button-fill button-large" @click="downloadImage" style="background-color:#FFCC00;color:#000000;height:100%;font-size:18px;font-weight:bold;border:0px;margin:24px 0px 24px 0px;text-transform:capitalize" fill large><f7-preloader></f7-preloader></a> 
          </f7-block>
        </f7-sheet>
        <f7-sheet ref="banner3_sheet" style="height:auto;border-radius:12px 12px 0px 0px">
          <p style="font-size:20px;font-weight:bold;margin:24px 18px">Refer and Earn</p>
          <f7-block style="padding:0px 18px;margin:0px;font-size:16px">
          <span style="font-weight:bold">Tell friends and family about Moonfoods lowest price and you both get 10% OFF coupon.</span>
          <p>
          <span style="font-weight:bold">Step 1 :</span> Tell using message or whatsapp by clicking on button below.<br>
          <span style="font-weight:bold">Step 2 :</span> Your friend should download app and using your mobile number as referral code while login.<br>
          <span style="font-weight:bold">Step 3 :</span> You both will get 10% coupon, which will apply directly on cart page during ordering.<br>
          <span style="font-weight:bold">Note :</span> You can see your coupons on account page. 
          </p> 
          </f7-block>
          <div style="margin:24px 18px">
          <p style="font-size:18px">Refer using -</p>
          <f7-row style="margin:0px">
                <f7-col>
                  <a class="link external button button-fill button-large" :href="'sms:?body=Hi, Do you know there is app called Moonfood where you get GREAT FOOD at THE LOWEST PRICE IN KOLHAPUR. Also Get additional 10%25 Off by using my refer code-'+this.loginmobile+' at the time of login. Download Link- https://play.google.com/store/apps/details?id=in.moonfood.android'" style="background-color:#FFCC00;color:#000000;height:100%;font-size:18px;font-weight:bold;border:0px;margin:0px;text-transform:capitalize" fill large>Text Msg</a>
                  </f7-col>
                <f7-col>
                  <a class="link external button button-fill button-large" :href="'https://wa.me/?text=Hi,%20Do%20you%20know%20there%20is%20app%20called%20Moonfood%20where%20you%20get%20GREAT%20FOOD%20at%20THE%20LOWEST%20PRICE%20IN%20KOLHAPUR.%20Also%20Get%20additional%2010%25%20Off%20by%20using%20my%20refer%20code-'+this.loginmobile+'%20at%20the%20time%20of%20login.%20Download%20Link-%20https://play.google.com/store/apps/details?id=in.moonfood.android'" style="background-color:#FFCC00;color:#000000;height:100%;font-size:18px;font-weight:bold;border:0px;margin:0px;text-transform:capitalize" fill large>Whatsapp</a>
                </f7-col>
          </f7-row>
          </div>
        </f7-sheet>
        <f7-sheet ref="banner4_sheet" style="height:auto;border-radius:12px 12px 0px 0px">
          <p style="font-size:20px;font-weight:bold;margin:24px 18px">Material Used for Cooking.</p>
          <f7-block style="padding:0px 18px 24px 18px;margin:0px;font-size:16px">
          <span style="font-weight:bold">We use quality material for cooking.</span>
          <p>
          <span style="font-weight:bold">Cooking Oil :</span> Fortune refined oil.<br>
          <span style="font-weight:bold">Masala :</span> Suhana and Everest Masala.<br>
          <span style="font-weight:bold">Bread :</span> Chakote Bread.<br>
          <span style="font-weight:bold">Salt :</span> Tata Salt.<br>
          <span style="font-weight:bold">Mayonnaise :</span> Cremica.<br>
          <span style="font-weight:bold">Maggi :</span> Nestle Maggi.<br>
          </p> 
          </f7-block>
        </f7-sheet>
  </f7-page>
</template>

<script>
import axios from '../axios';
import imagedownloader from '../../../aa/plugins/com.santinowu.cordova.imagedownloader/www/imagedownloader';
import offline from 'v-offline';
export default{
  data(){
    return{
      type:null,
      contact:'8600198512',
      preloader:true,
      index:null,
      menus:null,
      qty:[],
      checkbox:[],
      btn:[],
      length:null,
      offerSheet:false,
      veg:null,
      offerQty:null,
      menu_id:null,
      cartData:[],
      cartPrice:null,
      appVersion:null,
      addOfferBtn:true,
      toast_msg:null,
      offerLoader:false,
      downloadLoader:false,
      orders:[],
      pendingOrder:false,
      checkCartMenu:null,
      link:null,
      activeOrders:null,
      internet:null,
      status:'not shown',
      hours:null,
      mins:null,
      statusText:null,
      openingText:null,
      offerDate:null,
      offerIndex:null,
      offerMenu:null,
      offerPrice:null,
      referal:null,
      referalError:null,
      loginmobile:localStorage.getItem('loginmobile'),
      rating:null,
      loader:[],
      feedback:null,
      submitButton:false,
      ratingForm:false,
      cartItems:null,
      completed:null,
      types:[
        {"name":"Veg Rolls","image":"../assets/maggi.png"},
        {"name":"Non-Veg Rolls","image":"../assets/maggi.png"},
        {"name":"Sandwiches","image":"../assets/maggi.png"},
        {"name":"Veg Menu","image":"../assets/maggi.png"},
        {"name":"Non-Veg Menu","image":"../assets/maggi.png"},
        {"name":"Beverages","image":"../assets/maggi.png"},
        {"name":"Extras","image":"../assets/maggi.png"}
      ],
      offerBanners:[
        {"price":70,"menu":"Chicken Masala Roll + Coke"},
        {"price":65,"menu":"Paneer Masala Roll + Coke"},
        {"price":55,"menu":"Double Egg Bhurji + Coke"},
        {"price":70,"menu":"Olee Bhel"}
      ]
    };
  },
  components: {
    offline
  },
  mounted()
  {
    console.log(this.types);
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
var nd = new Date(utc + (3600000*+5.5));
//var ist =  nd.toLocaleString();
    console.log(this.offerBanners);
    var date = new Date();
    this.hours = nd.getHours();
    this.mins = nd.getMinutes();
    console.log(this.hours);
    this.getAppVersion();
    this.getCart();
    this.getOrders();
      setInterval(function(){
        if(localStorage.getItem('loginmobile')!=null)
        {
          this.getOrders();
        }
      }.bind(this), 10000);
  },
  methods:{
    downloadImage()
    {    
      this.downloadLoader = true;
        var successFn = function() {
          alert('Image saved to your gallery');
        };
        var cancelCallback = function() {
          alert('Error in download image');
        };
        imagedownloader.download('https://moonfood.in/share.jpg',successFn,cancelCallback);
        setTimeout(() => {
            this.downloadLoader = false;
            this.$refs.banner2_sheet.close();
        },8000);
    },
    getOrders()
    {
      axios({
          method:'GET',
          url : '/usersOrders/'+localStorage.getItem('loginmobile')
        }).then(response => {
          this.orders=response.data.result;
          console.log(this.orders); 
          this.activeOrders = 0;
          for(var i=0;i<this.orders.length;i++)
          {
            if(this.orders[i].completed==0)
            {
              this.activeOrders = this.activeOrders + 1;
              this.completed = 0;
            }
            else{
              if(this.orders[0].completed==1)
                this.completed = 1;
            }
          }
          if(this.orders[0].completed==1 && this.orders[0].rating==null)
          {
            this.ratingForm = true;
          }
          console.log(this.activeOrders);
        },(error) => {
        alert(error.response.data.message);
      });
    },
    clearStorage()
      {
        localStorage.setItem("type",null);
      },
      closeMenuSheet(route,path)
      {
        this.$refs.menusheet.close();
        route.navigate(path);
      },
      openBannerSheet(index)
      {
        if(index==1)
        {
          this.$refs.banner1_sheet.open();
        }
        if(index==2)
        {
          this.$refs.banner2_sheet.open();
        }
        if(index==3)
        {
          this.$refs.banner3_sheet.open();
        }
        if(index==4)
        {
          this.$refs.banner4_sheet.open();
        }
        var a = true;
        localStorage.setItem("sheetOpen",a);
      },
      minusQty(event,index)
        {
          var app = this.$f7;
          var z = app.stepper.getValue(".my_stepper");
          //console.log(z);
          this.loader[index] = 1;
          //console.log(index);
          console.log(this.loader[index]);
          if(z>0)
          {
            if(this.checkbox[index]==true)
                {
                    this.deleteQtyFromCartWithCheese(index);   
                }
                else
                {
                  console.log('fgj');
                    this.deleteQtyFromCartWithoutCheese(index);
                }
          }
          this.loader[index] = 0;
          //console.log(index);
          console.log(this.loader[index]);
        },
        plusQty(event,index)
        {
          //console.log(index);
          var app = this.$f7;
          var z = app.stepper.getValue(".my_stepper");
          this.loader[index] = 1;
          //console.log(index);
          console.log(this.loader[index]);
            //console.log(z+1);
            if(this.checkbox[index]==true)
            {
                this.addMenuToCartWithCheese(index);
            }
            else
            {
                this.addMenuToCartWithoutCheese(index);
            }
            
            //console.log(index);
          console.log(this.loader[index]);
        },
        deleteMenuFromCartWithoutCheese(index)
        {
            if(this.qty[index]==this.qty[index]+1)
            {
                axios({
                method: 'POST',
                url: 'deleteMenuFromCartWithoutCheese',
                data: {
                  menu_id: this.cartData[this.index].menu_id,
                  mobile:localStorage.getItem('loginmobile')
                }
            }).then(response => {
                console.log(response);
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
        deleteMenuFromCartWithCheese(index)
        {
            if(this.qty[index]==this.qty[index]+1)
            {
            axios({
                method: 'POST',
                url: 'deleteMenuFromCartWithCheese',
                data: {
                  menu_id: this.cartData[this.index].menu_id,
                  mobile:localStorage.getItem('loginmobile')
                }
            }).then(response => {
                console.log(response);
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
        deleteQtyFromCartWithCheese(index)
        {
            axios({
                method: 'POST',
                url: 'deleteQtyFromCartWithCheese',
                data: {
                  menu_id: this.menus[index].menu_id,
                  qty:1,
                  mobile:localStorage.getItem('loginmobile')
                }
            }).then(response => {
                console.log(response);
                this.getCart();
            },(error) => {
                if (error.response.data.message != undefined) {
                  alert(error.response.data.message);
                }
                else {
                  alert('connection error found,please retry again');
                }
            });
        },
        deleteQtyFromCartWithoutCheese(index)
        {
              console.log('ghj');
            axios({
                method: 'POST',
                url: 'deleteQtyFromCartWithoutCheese',
                data: {
                  menu_id: this.menus[index].menu_id,
                  qty:1,
                  mobile:localStorage.getItem('loginmobile')
                }
            }).then(response => {
                console.log(response);
                this.getCart();
            },(error) => {
                if (error.response.data.message != undefined) {
                  alert(error.response.data.message);
                }
                else {
                  alert('connection error found,please retry again');
                }
            });
        },
        addMenuToCartWithoutCheese(index)
        {
            axios({
                method: 'POST',
                url: 'addMenuToCartWithoutCheese',
                data: {
                  menu_id: this.menus[index].menu_id,
                  qty:1,
                  mobile:localStorage.getItem('loginmobile')
                }
            }).then(response => {
                console.log(response.data.result);
                this.getCart();
                this.loader[index] =0;
            },(error) => {
                if (error.response.data.message != undefined) {
                  alert(error.response.data.message);
                }
                else {
                  alert('connection error found,please retry again');
                }
            });
        },
        addMenuToCartWithCheese(index)
        {
            axios({
                method: 'POST',
                url: 'addMenuToCartWithCheese',
                data: {
                  menu_id: this.menus[index].menu_id,
                  qty:1,
                  mobile:localStorage.getItem('loginmobile')
                }
            }).then(response => {
                console.log(response.data.result);
                this.getCart();
                this.loader[index] =0;
            },(error) => {
                if (error.response.data.message != undefined) {
                  alert(error.response.data.message);
                }
                else {
                  alert('connection error found,please retry again');
                }
            });
        },
      selectCheese(event,index)
      {
        var app = this.$f7;
            var z = app.stepper.setValue(".my_stepper",0);
        if(event.target.checked)
        {
          this.checkbox[index] = true;
          this.menus[index].price = this.menus[index].price + 10;
        }
        else
        {
          this.checkbox[index] = false;
          this.menus[index].price = this.menus[index].price - 10;
        }
      },
      getType()
      {
        this.index = localStorage.getItem("index");
        this.checkbox = [];
         var app = this.$f7;
        //app.checkbox.checked = false;
        if(this.index==0)
        {
          this.type = "Veg Rolls";
          this.veg = 1;
          this.menus = [
            {"name":"Mix Veg Roll","price":31,"menu_id":15},
            {"name":"Paneer Masala Roll","price":45,"menu_id":16}
          ];
        }
        else if(this.index==1)
        {
          this.type = "Non-Veg Rolls";
          this.veg = 0;
          this.menus = [
            {"name":"Single Omlette Roll","price":29,"menu_id":17},
            {"name":"Double Omlette Roll","price":35,"menu_id":18},
            {"name":"Chicken Masala Roll","price":45,"menu_id":19},
            {"name":"Single Omlette Chicken Masala Roll","price":52,"menu_id":20},
            {"name":"Double Omlette Chicken Masala Roll","price":60,"menu_id":21},
          ];
        }
        else if(this.index==2)
        {
          this.type = "Sandwiches";
          this.veg = 1;
          this.menus = [
            {"name":"Veg Jumbo Sandwich","price":30,"menu_id":32},
            {"name":"Veg Mini Grilled Sandwich","price":30,"menu_id":33},
            {"name":"French Fries","price":32,"menu_id":34},
            {"name":"Masala French Fries","price":42,"menu_id":35},
            {"name":"Peri Peri French Fries","price":37,"menu_id":36}
          ];
        }
        else if(this.index==3)
        {
          this.type = "Veg Menu";
          this.veg = 1;
          this.menus = [
            {"name":"Olee Bhel","price":16,"menu_id":3},
            {"name":"Fried Maggi","price":16,"menu_id":1},
            {"name":"Soupy Maggi","price":13,"menu_id":24},
            {"name":"Bread Chilla","price":14,"menu_id":5},
          ];
        }
        else if(this.index==4)
        {
          this.type = "Non-Veg Menu";
          this.veg = 0;
          this.menus = [
            {"name":"Double Bread Omlette","price":14,"menu_id":2},
            {"name":"Double Egg Bhurji","price":30,"menu_id":6},
            {"name":"2 Boiled Eggs","price":14,"menu_id":14}  
          ];
        }
        else if(this.index==5)
        {
          this.type = "Beverages";
          this.veg = 1;
          this.menus = [
            {"name":"Coca-Cola(250 ml)","price":20,"menu_id":22},
            {"name":"Thums Up(250 ml)","price":20,"menu_id":23},
            {"name":"Sprite(250 ml)","price":20,"menu_id":25}
          ];
        }
        else if(this.index==6)
        {
          this.type = "Extras";
          this.veg = 1;
          this.menus = [
            {"name":"Roasted Bread","price":2,"menu_id":7},
            {"name":"Tomato Ketchup","price":2,"menu_id":8},
            {"name":"Shev","price":2,"menu_id":9}
          ];
        }
        else if(this.index==7)
        {
          this.type = "Chicken Masala Roll + Coke";
          this.veg = 0;
          this.menus = [
            {"name":"Chicken Masala Roll + Thums Up","price":70,"menu_id":26},
            {"name":"Chicken Masala Roll + Sprite","price":70,"menu_id":27}
          ];
        }
        else if(this.index==8)
        {
          this.type = "Paneer Masala Roll + Coke";
          this.veg = 1;
          this.menus = [
            {"name":"Paneer Masala Roll + Thums Up","price":65,"menu_id":28},
            {"name":"Paneer Masala Roll + Sprite","price":65,"menu_id":29}
          ];
        }
        else if(this.index==9)
        {
          this.type = "Sandwich + French Fries";
          this.veg = 1;
          this.menus = [
            {"name":"Veg Jumbo Sandwich + French Fries","price":60,"menu_id":37},
            {"name":"Veg Mini Grilled Sandwich + French Fries","price":60,"menu_id":38}
          ];
        }
        else if(this.index==10)
        {
          this.type = "Olee Bhel Combo";
          this.veg = 1;
          this.menus = [
            {"name":"3 Olee Bhel Combo","price":60,"menu_id":10}
          ];
        }
        this.preloader = false;
        this.length = this.menus.length;
        for(var i=0;i<this.length;i++)
        {
          this.btn[i] = true;
          this.checkbox[i] = false;
        }
      },
    openSubMenus(index,type)
    {
      localStorage.setItem("type",type);
      localStorage.setItem("index",index);
      this.qty = [];
      var app = this.$f7;
      var z = app.stepper.setValue(".my_stepper",0);
      this.$refs.menusheet.open();
      var a = true;
      localStorage.setItem("sheetOpen",a);
      this.getType();
    },
    saveFeedback()
    {
      console.log(this.orders[0].order_id);
        axios({
          method:'POST',
          url : 'saveFeedback',
          data:{
            'order_id': this.orders[0].order_id,
            'rating': this.rating,
            'feedback': this.feedback
          }
      }).then(response => {
          console.log(response);
          this.rating = null;
          this.feedback = null;
          this.ratingForm = false;
          this.toast_msg = 'Thanks for your Feedback';
            setTimeout(() => {
                this.toast_msg = null;
            },2000);
      }).catch(error => {
          if(error.response.data.message != undefined)
              alert(error.response.data.message);
          else
              alert('failed to add new address');
      });
    },
    setRating(rating,index)
    {
      this.rating = rating;
      this.submitButton = true;
    },
    openOfferSheet(index,menu,price)
    {
      this.offerIndex = index;
      this.offerMenu = menu;
      this.offerPrice = price;
      this.offerSheet = true;
      this.offerQty = 0;
      console.log(this.offerMenu);
      localStorage.setItem("sheetOpen",this.offerSheet);
      this.$refs.offersheet.open();
    },
    openReferSheet()
    {
      var open = true;
      localStorage.setItem("sheetOpen",open);
      this.$refs.refersheet.open();
    },
    sendRefer()
    {
      if(this.referal==null || this.referal=='' || this.referal.length!=10)
      {
        this.referalError = "Enter valid referal number";
      }
      else
      {
        axios({
          method: 'POST',
          url: 'sendReferMessage',
          data: {referal: this.referal,mobile:localStorage.getItem('loginmobile')}
        }).then(response => {
          console.log(response);
          this.$refs.refersheet.close();
          this.toast_msg = 'Refer message send successfully';
          setTimeout(() => {
            this.toast_msg = null;
          },2000);
        }, (error) => {
          if (error.response.data.message != undefined) {
            this.referalError = error.response.data.message;
          }
          else {
            alert('connection error found,please retry again');
          }
        });
      }
    },
    openCartPage(route,path)
    {
      localStorage.setItem('status',this.statusText);
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
    addBannerOffer()
    {
      this.$refs.offersheet.open();
    },
    getAppVersion()
    {
      axios({
        method:'GET',
        url : 'getAppVersion'
      }).then(response => {
        this.appVersion = response.data.result.version;
        this.link = response.data.result.link; 
        this.offerDate = response.data.result.date;
        localStorage.setItem('offerDate',this.offerDate);
        this.statusText = response.data.result.statusText;
        localStorage.setItem('status',this.statusText);
        this.openingText = response.data.result.openingText;
        console.log(response);
      },(error) => {
        alert(error.response.data.message);
      });
    },
    getCart()
    {
      axios({
        method:'GET',
          url : 'getUserCart/'+localStorage.getItem('loginmobile')
      }).then(response => {
          console.log(response.data.result); 
          this.cartData = response.data.result;
          if(this.cartData.length==0)
          {
            this.checkCartMenu = false;
          }
          for(var i=0;i<this.cartData.length;i++)
          {
            if(this.cartData[i].menu_id==1 || this.cartData[i].menu_id==2 || this.cartData[i].menu_id==3 || 
              this.cartData[i].menu_id==4 || this.cartData[i].menu_id==5 || this.cartData[i].menu_id==6)
            {
              this.checkCartMenu = true;
            }
          }
          this.cartPrice = 0;
          this.cartItems = 0;
          var price = null;
          for(var i=0;i<this.cartData.length;i++)
          {
            if(this.cartData[i].menu_id==1)
            {
              price = 16;
            }
            else if(this.cartData[i].menu_id==2)
            {
              price = 14;
            }
            else if(this.cartData[i].menu_id==3)
            {
              price = 16;
            }
            else if(this.cartData[i].menu_id==4)
            {
              price = 25;
            }
            else if(this.cartData[i].menu_id==5)
            {
              price = 14;
            }
            else if(this.cartData[i].menu_id==6)
            {
              price = 30;
            }
            else if(this.cartData[i].menu_id==7)
            {
              price = 2;
            }
            else if(this.cartData[i].menu_id==8)
            {
              price = 2;
            }
            else if(this.cartData[i].menu_id==9)
            {
              price = 2;
            }
            else if(this.cartData[i].menu_id==10)
            {
              price = 70;
            }
            else if(this.cartData[i].menu_id==11)
            {
              price = 75;
            }
            else if(this.cartData[i].menu_id==12)
            {
              price = 70;
            }
            else if(this.cartData[i].menu_id==13)
            {
              price = 55;
            }
            else if(this.cartData[i].menu_id==14)
            {
              price = 14;
            }
            else if(this.cartData[i].menu_id==15)
            {
              price = 31;
            }
            else if(this.cartData[i].menu_id==16)
            {
              price = 42;
            }
            else if(this.cartData[i].menu_id==17)
            {
              price = 29;
            }
            else if(this.cartData[i].menu_id==18)
            {
              price = 35;
            }
            else if(this.cartData[i].menu_id==19)
            {
              price = 45;
            }
            else if(this.cartData[i].menu_id==20)
            {
              price = 52;
            }
            else if(this.cartData[i].menu_id==21)
            {
              price = 60;
            }
            else if(this.cartData[i].menu_id==22)
            {
              price = 20;
            }
            else if(this.cartData[i].menu_id==23)
            {
              price = 20;
            }
            else if(this.cartData[i].menu_id==24)
            {
              price = 13;
            }
            else if(this.cartData[i].menu_id==25)
            {
              price = 20;
            }
            else if(this.cartData[i].menu_id==26)
            {
              price = 70;
            }
            else if(this.cartData[i].menu_id==27)
            {
              price = 70;
            }
            else if(this.cartData[i].menu_id==28)
            {
              price = 65;
            }
            else if(this.cartData[i].menu_id==29)
            {
              price = 65;
            }
            else if(this.cartData[i].menu_id==30)
            {
              price = 55;
            }
            else if(this.cartData[i].menu_id==31)
            {
              price = 55;
            }
            else if(this.cartData[i].menu_id==32)
            {
              price = 30;
            }
            else if(this.cartData[i].menu_id==33)
            {
              price = 30;
            }
            else if(this.cartData[i].menu_id==34)
            {
              price = 32;
            }
            else if(this.cartData[i].menu_id==35)
            {
              price = 42;
            }
            else if(this.cartData[i].menu_id==36)
            {
              price = 37;
            }
            else if(this.cartData[i].menu_id==37)
            {
              price = 60;
            }
            else if(this.cartData[i].menu_id==38)
            {
              price = 60;
            }
            if(this.cartData[i].cheese==1)
            {
              price = price + 10;
            }
            this.cartPrice = this.cartPrice + (price * this.cartData[i].qty);
            this.cartItems = this.cartItems + this.cartData[i].qty;
          }
      }).catch(function(error){
          if (error.response.data.message != undefined)
            console.log(error.response.data.message);
          else
            alert('system error found,please try again');
        });
    },
    addToCart()
    {
      this.getCart();
      var qty = null;
      if(this.offerSheet == true)
      {
        this.offerLoader = true;
        qty = this.offerQty;
      }
      else{

      }
      axios({
        method: 'POST',
        url: 'addToCart',
        data: {
          menu_id: this.menu_id,
          qty:qty,
          mobile:localStorage.getItem('loginmobile')
        }
      }).then(response => {
        const self = this;
        self.$refs.offersheet.close();
        localStorage.setItem("sheetOpen",'false');
        this.offerSheet = false;
        this.addOfferBtn = true;
        this.offerLoader = false;
        this.toast_msg = 'Menu Added To Cart';
        setTimeout(() => {
          this.toast_msg = null;
        },2000);
        this.getCart();
      },(error) => {
        if (error.response.data.message != undefined) {
          alert(error.response.data.message);
        }
        else {
          alert('connection error found,please retry again');
        }
      });
    },
    setOfferQty(value)
    {
      this.offerQty = 0;
      if(value>0){
        this.offerLoader = false;
        this.addOfferBtn = false;
      }
      else
        this.addOfferBtn = true;
      this.menu_id = 10;
      this.offerQty = value;
    },
    openNotificationPage(route,path)
    {
      route.navigate(path);
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
.md .navbar:after{
  content:none
}
.lineclampin{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
}
.performance_selector_active{
    background-color:#273657 !important;
    color:#00FF96;
  }
.variety_selector_active{
    background-color:#273657 !important;
    color:#00FF96;
  }
.aboutus_selector_active{
    background-color:#273657 !important;
    color:#00FF96;
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
    border-color: #4CAF50;
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
    background-color: #4CAF50;
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