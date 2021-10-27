var msg = new Vue({
    el:"#begin",
    data:{
        message:"See you again, world!",
        click_bank:0,
        bank_demarche:false,
        lock_bank:false, lock_ofii:false, lock_caf:false,
        passport:1, a_naissance:1, attes_logement:1, attes_etudiant:1,
        stats:[
            
            {stat_name:"Health", value: 100},
            {stat_name:"Money", value: 7000},
            {stat_name:"days", value: 1 },
            {stat_name:"study", value: 10},
            {stat_name:"energy", value: 50},
            {stat_name:"happiness", value: 100},
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
        },
        intro_bank:function(){
            if (this.click_bank != -1){
                this.click_bank += 1
                if(this.click_bank % 2 != 0){
                    this.message = "The introduction of bank..."
                    this.bank_demarche = true
                }
                else{
                    this.bank_demarche = false
                }
                this.click_bank = 0 // Not to get a too big value
            }
            else{
                this.message = "You already finished the task"
            }
        },
        chk_bank:function(){
            if (this.passport == 1 && this.a_naissance == 1 && this.attes_etudiant == 1 && this.attes_logement == 1){
                this.message = "demarche reussi, study + 10, energy - 10, hanpiness + 10"
                this.click_bank = -1
                this.stats[3].value += 5  // study
                this.stats[4].value -= 10 // energy
                this.stats[5].value += 10 // hanpiness
            }
            else{
                this.message = "T'as pas tous les choses necessaires... reviens quand t'es pret"
            }
            this.bank_demarche = false
        },
        add_object:function(times){
            times += 1
            times = times % 2
            return times
        }
    }
})