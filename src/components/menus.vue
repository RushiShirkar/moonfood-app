<template>
	<f7-page>
		<center>
		<div v-if="preloader==true" class="preloader" style="margin:25px 0px 10px 0px">
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
      <f7-row>
      	<f7-col width="100">
			<p v-if="preloader==false" style="color:#000000;margin:16px 24px 16px 18px;font-size:32px;font-weight:bold">
				<a href="/home" @click="clearStorage" class="link icon-only" style="color: #000000;height:43px;margin-right:10px"><f7-icon f7="chevron_left"></f7-icon></a>
				{{type}}
			</p>
		</f7-col>
		<f7-col style="margin-top:-55px;margin-left:300px">
		<f7-link href="/cart">
			<img src="../assets/cart.svg" alt=""><f7-badge v-show="cartData.length>0" color="black" style="position:absolute;margin:-5px 0px 0px -5px">{{cartData.length}}</f7-badge></img>
		</f7-link>
		</f7-col>
		</f7-row>
		<f7-block>
			<template v-for="(menu,index) in menus">
				<f7-card style="height:128px">
					<f7-row no-gap style="margin:20px">
						<f7-col>
							<img v-if="menu.menu_id==1" src="../assets/maggi.png" style="height:100px;width:100px;border-radius:8px" alt="">
							<img v-if="menu.menu_id==2" src="../assets/omelette.png" style="height:100px;width:100px;border-radius:8px" alt="">
							<img v-if="menu.menu_id==3" src="../assets/olee-bhel.png" style="height:100px;width:100px;border-radius:8px" alt="">
							<img v-if="menu.menu_id==5" src="../assets/bread-chilla.png" style="height:100px;width:100px;border-radius:8px" alt="">
							<img v-if="menu.menu_id==6" src="../assets/bread-bhurji.png" style="height:100px;width:100px;border-radius:8px" alt="">
							<img v-if="menu.menu_id==7" src="../assets/bread.png" style="height:100px;width:100px;border-radius:8px" alt="">
							<img v-if="menu.menu_id==8" src="../assets/ketchup.png" style="height:100px;width:100px;border-radius:8px" alt="">
							<img v-if="menu.menu_id==9" src="../assets/shev.png" style="height:100px;width:100px;border-radius:8px" alt="">
							<img v-if="menu.menu_id==14" src="../assets/boiled-egg.png" style="height:100px;width:100px;border-radius:8px" alt="">
							<img v-if="menu.menu_id==15" src="../assets/maggi.png" style="height:100px;width:100px;border-radius:8px" alt="">
							<img v-if="menu.menu_id==16" src="../assets/maggi.png" style="height:100px;width:100px;border-radius:8px" alt="">
							<img v-if="menu.menu_id==17" src="../assets/maggi.png" style="height:100px;width:100px;border-radius:8px" alt="">
							<img v-if="menu.menu_id==18" src="../assets/maggi.png" style="height:100px;width:100px;border-radius:8px" alt="">
							<img v-if="menu.menu_id==19" src="../assets/maggi.png" style="height:100px;width:100px;border-radius:8px" alt="">
							<img v-if="menu.menu_id==20" src="../assets/maggi.png" style="height:100px;width:100px;border-radius:8px" alt="">
							<img v-if="menu.menu_id==21" src="../assets/maggi.png" style="height:100px;width:100px;border-radius:8px" alt="">
							<img v-if="menu.menu_id==22" src="../assets/maggi.png" style="height:100px;width:100px;border-radius:8px" alt="">
							<img v-if="menu.menu_id==23" src="../assets/maggi.png" style="height:100px;width:100px;border-radius:8px" alt="">
							<img v-if="menu.menu_id==24" src="../assets/maggi.png" style="height:100px;width:100px;border-radius:8px" alt="">
						</f7-col>
						<f7-col style="margin-top:-12px">
							<p style="font-size:16px">{{menu.name}}</p>
							<f7-list v-if="menu.menu_id==1 || menu.menu_id==6 || menu.menu_id==15 || menu.menu_id==16 || menu.menu_id==17 || menu.menu_id==18 || menu.menu_id==19 || menu.menu_id==20 || menu.menu_id==21" style="margin-left:-20px;margin-top:-20px">
								<f7-list-item checkbox @change="selectCheese($event,index)" style="color:green;font-size:16px;font-weight:bold" title="Cheese"></f7-list-item>
							</f7-list>
							<f7-row>
								<f7-col>
									<p style="font-size:18px;margin-top:0px;margin-left:-10px">₹{{menu.price}}</p>
								</f7-col>
								<f7-col>
									<f7-stepper :value="qty[index]" @stepper:minusclick="minusQty($event,index)" @stepper:plusclick="plusQty($event,index)" color="black" fill small style="margin-left:-40px"></f7-stepper>
								</f7-col>
							</f7-row>
						</f7-col>
					</f7-row>
				</f7-card>
			</template>
		</f7-block>
	</f7-page>
</template>

<script>
import axios from '../axios';
export default{
    data()
    {
        return{
            type:null,
            preloader:true,
            index:null,
            menus:null,
            qty:[],
            checkbox:[],
            btn:[],
            length:null,
            cartData:[]
        };
    },
    mounted()
    {
    	setTimeout(() => {
            this.getType();
        },500);
    },
    methods:
    {
        setQty(event)
        {
            console.log(event);
        },
    	getCart()
    	{
    		axios({
            method:'GET',
            url : 'getUserCart/'+localStorage.getItem('loginmobile')
            }).then(response => {
                console.log(response.data.result); 
                this.cartData = response.data.result;
                if(this.cartData.length>0)
                {
                	for(var i=0;i<this.length;i++)
                	{
                        for(var j=0;j<this.cartData.length;j++)
                        {
                            if(this.menus[i].menu_id==this.cartData[j].menu_id)
                            {
                                for(var k=j+1;k<this.cartData.length;k++)
                                {
                                    if(this.cartData[j].menu_id==this.cartData[k].menu_id)
                                    {
                                        this.qty[i] = this.cartData[j].qty + this.cartData[k].qty;
                                        break;  
                                    }
                                    else{
                                        this.qty[i] = this.cartData[j].qty;
                                    }
                                }
                            }
                        }
                	}
                }
            }).catch(function(error){
                if (error.response.data.message != undefined)
                    console.log(error.response.data.message);
                else
                    alert('system error found,please try again');
            });
    	},
        minusQty(event,index)
        {
            if(this.qty[index]==0)
            {
                if(this.checkbox[index]==true)
                {
                    this.deleteMenuFromCartWithCheese(index);
                }
                else
                {
                    this.deleteMenuFromCartWithoutCheese(index);
                }
            }
            else
            {
                if(this.checkbox[index]==true)
                {
                    this.deleteQtyFromCartWithCheese(index);   
                }
                else
                {
                    this.deleteQtyFromCartWithoutCheese(index);
                }
            }
        },
        plusQty(event,index)
        {
            if(this.checkbox[index]==true)
            {
                console.log('we');
                this.addMenuToCartWithCheese(index);
            }
            else
            {
                console.log('he');
                this.addMenuToCartWithoutCheese(index);
            }
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
            if(this.qty[index]>0)
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
            }
        },
        deleteQtyFromCartWithoutCheese(index)
        {
            if(this.qty[index]>0)
            {
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
            }
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
    		if(event.target.checked)
		    {
		    	this.checkbox[index] = true;
		    	this.menus[index].price = this.menus[index].price + 15;
		    }
		    else
		    {
		    	this.checkbox[index] = false;
		    	this.menus[index].price = this.menus[index].price - 15;
		    }
    	},
    	clearStorage()
    	{
    		localStorage.setItem("type",null);
    	},
    	getType()
    	{
    		this.index = localStorage.getItem("index");
    		if(this.index==0)
    		{
    			this.type = "Veg Rolls";
    			this.menus = [
    				{"name":"Mixed Veg Roll","price":40,"menu_id":15},
    				{"name":"Paneer Masala Roll","price":55,"menu_id":16}
    			];
    		}
    		else if(this.index==1)
    		{
    			this.type = "Non-Veg Rolls";
    			this.menus = [
    				{"name":"Single Omlette Roll","price":35,"menu_id":17},
    				{"name":"Double Omlette Roll","price":45,"menu_id":18},
    				{"name":"Chicken Masala Roll","price":55,"menu_id":19},
    				{"name":"Single Omlette Chicken Masala Roll","price":65,"menu_id":20},
    				{"name":"Double Omlette Chicken Masala Roll","price":75,"menu_id":21},
    			];
    		}
    		else if(this.index==2)
    		{
    			this.type = "Veg Menu";
    			this.menus = [
    				{"name":"Olee Bhel","price":25,"menu_id":3},
    				{"name":"Fried Maggi","price":25,"menu_id":1},
    				{"name":"Soupy Maggi","price":20,"menu_id":24},
    				{"name":"Bread Chilla","price":22,"menu_id":5},
    			];
    		}
    		else if(this.index==3)
    		{
    			this.type = "Non-Veg Menus";
    			this.menus = [
    				{"name":"Double Bread Omlette","price":20,"menu_id":2},
    				{"name":"Double Egg Bhurji","price":40,"menu_id":6},
    				{"name":"Boiled Eggs","price":20,"menu_id":14}	
    			];
    		}
    		else if(this.index==4)
    		{
    			this.type = "Beverages";
    			this.menus = [
    				{"name":"Water Bottle(500 ml)","price":10,"menu_id":22},
    				{"name":"Coke(250 ml)","price":20,"menu_id":23}
    			];
    		}
    		else if(this.index==5)
    		{
    			this.type = "Extras";
    			this.menus = [
    				{"name":"Bread","price":2,"menu_id":7},
    				{"name":"Ketchup","price":2,"menu_id":8},
    				{"name":"Shev","price":2,"menu_id":9}
    			];
    		}
    		this.preloader = false;
    		this.length = this.menus.length;
    		for(var i=0;i<this.length;i++)
    		{
    			this.btn[i] = true;
    		}
    		this.getCart();
    	}
    }
}
</script>

<style scoped>

</style>