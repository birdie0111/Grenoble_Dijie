var msg = new Vue({
    el:"#begin",
    data:{
        message:"See you again, world!",
        click_bank:0, click_tag:0,
        bank_demarche:false, tag_demarche:false,
        lock_bank:false, lock_ofii:false, lock_caf:false,
        passport:1, a_naissance:1, attes_logement:1, attes_etudiant:1, photo:1,
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
            this.stats[1].value -= 20 // money
            this.message = "day "+this.stats[2].value
            // rent for the studio
            if (this.stats[2].value % 3 == 0){
                this.message = "pay for the rent of your studio: money - 500"
                this.stats[1].value -= 500
            }
            // random events todo
        },
        add_object:function(times){
            times += 1
            times = times % 2
            return times
        },
        //-----------------------------------bank---------------------------------
        intro_bank:function(){
            if (this.click_bank != -1){
                this.click_bank += 1
                if(this.click_bank % 2 != 0){
                    this.message = "The introduction of bank..."
                    this.bank_demarche = true
                }
                else{
                    this.bank_demarche = false
                    this.click_bank = 0 // Not to get a too big value
                }
                
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
        //-------------------------------------------tag-------------------------------------
        intro_tag:function(){
            if (this.click_tag != -1){
                this.click_tag += 1
                if(this.click_tag % 2 != 0){
                    this.message = "The introduction of TAG..."
                    this.tag_demarche = true
                }
                else{
                    this.tag_demarche = false
                    this.click_tag = 0 // Not to get a too big value
                }
                
            }
            else{
                this.message = "You already finished the task"
            }
        },
        chk_tag:function(){
            if (this.passport == 1 && this.photo == 1){
                this.message = "demarche reussi, study + 10, energy - 10, hanpiness + 10"
                this.click_tag = -1
                this.stats[3].value += 5  // study
                this.stats[4].value -= 10 // energy
                this.stats[5].value += 10 // hanpiness
            }
            else{
                this.message = "T'as pas tous les choses necessaires... reviens quand t'es pret"
            }
            this.tag_demarche = false
        },
    }
})