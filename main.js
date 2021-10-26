var msg = new Vue({
    el:"#begin",
    data:{
        message:"See you again, world!",

        stats:[
            
            {stat_name:"Health", value: 100},
            {stat_name:"Money", value: 7000},
            {stat_name:"days", value: 1 },
            {stat_name:"study", value: 10},
            {stat_name:"energy", value: 50},
        ],
    },
    methods:{
        study:function(){
            if (this.stats[4].value >=10){
                this.message = "Studying..."
                this.stats[3].value += 5  // study
                this.stats[4].value -= 10 // energy
            }
            else{
                this.message = "You ran out of energy"
            }
        },
        next_day:function(){
            this.stats[4].value = 50 // energy
            this.stats[2].value += 1 // days
            this.message = "day "+this.stats[2].value
        }
    }
})