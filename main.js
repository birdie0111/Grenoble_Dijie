var msg = new Vue({
    el:"#begin",
    data:{
        message:"See you again, world!",
        click_bank:0, click_tag:0, click_school:0, // demarche button
        bank_demarche:false, tag_demarche:false, school_demarche:false, // demarche button
        lock_ofii:false, lock_caf:false, // lock locations

        school_weekday:false, tag_done:false, // effect of demarche
        passport:0, a_naissance:0, attes_logement:0, attes_etudiant:0, photo:0, //backpack

        // results
        be1:false, be2:false,
        he1:false,

        // events
        rd_num:-1, event_num:-1, content:true,

        // stats
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
        next_day:function(){
            this.stats[4].value = 50 // energy
            this.stats[2].value += 1 // days
            this.stats[1].value -= 20 // money
            this.message = "day "+this.stats[2].value
            // rent for the studio
            if (this.stats[2].value % 15 == 0){
                this.message = "pay for the rent of your studio: money - 500"
                this.stats[1].value -= 500
                if (this.tag_done == true){
                    this.stats[1].value -= 15
                }
            }
            // ------------------------------------random events todo--------------------------------------
            this.rd_num = Math.floor(Math.random()*4)
            if(this.rd_num == 0 && this.stats[2].value % 7 == 0){ // random event 0:
                this.message = " Your classmates wants to invite you to a party, you wanna go? (y/n)"
                this.content = false
            }
            else if (this.rd_num == 1){
                this.message = "day "+this.stats[2].value
            }
            else if (this.rd_num == 2){
                this.message = "day "+this.stats[2].value
            }
            else if (this.rd_num == 3){
                this.message = " event 3 "
                //this.content = false
            }

            // -------------------------------------school, bank events-----------------------------------
            // if you don't study at school on weekdays, your study will drop
            if (this.stats[2].value % 6 != 0 && this.stats[2].value % 7 != 0){// if on weekdays
                if(this.school_weekday == false){
                    this.stats[3].value -= 7
                }
                else{
                    this.school_weekday = false
                }
            }
            // if you don't do the bank demarche before the 7th day, your hanpiness will drop
            if (this.stats[2].value >= 7 && this.lock_ofii == false){
                this.stats[5].value -= 10
            }
            // endings
            if (this.stats[1].value <= 0){
                this.be1 = true
                this.message=" You don't have any money to continue your study, you failed the game... "
            }
            if (this.stats[3].value <= 25 && this.stats[2].value >= 5){
                this.be2 = true
                this.message=" You failed your semester...  GAME OVER"
            }
        },
        // ---------------------------------------------------------------------------------------
        add_object:function(times){
            times += 1
            times = times % 2
            return times
        },
        study:function(){
            if (this.stats[4].value >=10){
                this.message = "Studying..."
                this.stats[3].value += 5  // study
                this.stats[4].value -= 15 // energy
                this.stats[5].value -= 5 // hanpiness
            }
            else{
                this.message = "You ran out of energy"
            }
        },
        rd_1_y:function(){
            this.stats[3].value += 5 // study
            this.stats[4].value -= 15 // energy
            this.stats[1].value -= 10 // money
            this.stats[0].value -= 5 //health
            this.stats[5].value += 15 // hanpiness
            this.content = true
            this.rd_num = -1
        },
        rd_1_n:function(){
            this.stats[3].value += 5 // study
            this.stats[5].value -= 10 // hanpiness
            this.content = true
            this.rd_num = -1
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
            if(this.tag_done == false){
                this.stats[1].value -= 4 // money for transport
            }
            if (this.passport == 1 && this.a_naissance == 1 && this.attes_etudiant == 1 && this.attes_logement == 1){
                this.message = "demarche reussi, study + 10, energy - 10, hanpiness + 10"
                this.click_bank = -1
                this.stats[3].value += 5  // study
                this.stats[4].value -= 10 // energy
                this.stats[5].value += 10 // hanpiness
                this.lock_ofii = true
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
                this.tag_done = true
            }
            else{
                this.message = "T'as pas tous les choses necessaires... reviens quand t'es pret"
            }
            this.tag_demarche = false
        },
        //---------------------------------------school--------------------------------------
        intro_school:function(){
            if(this.tag_done == false){
                this.stats[1].value -= 4 // money for transport
            }
            this.click_school += 1
            if(this.click_school % 2 != 0){
                this.message = "The introduction of school..."
                this.school_demarche = true
            }
            else{
                this.school_demarche = false
                this.click_school = 0 // Not to get a too big value
            }
        },
        study_school:function(){
            if (this.stats[4].value == 0){
                this.message = "You ran out of energy"
            }
            else if (this.stats[2].value % 6 != 0 && this.stats[2].value % 7 != 0){ // on weekdays
                this.message = "studying at school, study + 10, energy - 10, hanpiness - 3"
                this.stats[3].value += 10  // study
                this.stats[4].value -= 10 // energy
                this.stats[5].value -= 3 // hanpiness
                this.school_weekday = true
            }
            else{
                this.message = " pas d'ecole aujourd'hui "
            }
        },
        socialize_school:function(){
            if (this.stats[4].value == 0){
                this.message = "You ran out of energy"
            }
            if (this.stats[2].value % 6 != 0 && this.stats[2].value % 7 != 0){ // on weekdays
                this.message = "socializing at school, study + 2, energy - 10, hanpiness + 15"
                this.stats[3].value += 2  // study
                this.stats[4].value -= 10 // energy
                this.stats[5].value += 10 // hanpiness
            }
            else{
                this.message = " pas d'ecole aujourd'hui "
            }
        }
    }
})