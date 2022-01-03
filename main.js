var msg = new Vue({
    el:"#begin",
    data:{
        message:"Bonjour, ce jeu est un simulator de la vie d'étudiant étranger à grenoble",
        count:0,
        click_bank:0, click_tag:0, click_school:0, click_caf:0, click_ofii:0, // demarche button
        bank_demarche:false, tag_demarche:false, school_demarche:false, caf_demarche:false, ofii_demarche:false, // demarche button
        lock_ofii:false, lock_caf:false, // lock locations

        school_weekday:false, tag_done:false, // effect of demarche
        passport:0, a_naissance:0, attes_logement:0, attes_etudiant:0, photo:0, cb:0, ofii:0, //backpack

        // results + mountain
        rd_travel:0,
        mt1:false, mt2:false, mt3:false,
        he1:false,

        // events
        rd_num:-1, event_num:-1, content:true,

        // stats
        stats:[
            
            {stat_name:"Health", value: 80},
            {stat_name:"Money", value: 3500},
            {stat_name:"days", value: 1 },
            {stat_name:"study", value: 10},
            {stat_name:"energy", value: 50},
            {stat_name:"happiness", value: 100},
        ],
    },
    methods:{
        next_day:function(){
            if(this.stats[2].value >= 45){
                this.message = "Congrats, T'as réussi ton étude"
            }
            this.stats[0].value -= 5 // health
            this.stats[4].value = 50 // energy
            this.stats[2].value += 1 // days
            this.stats[1].value -= 20 // money
            this.message = "day "+this.stats[2].value
            // rent for the studio + forfait mobile, tag etc.
            if (this.stats[2].value % 15 == 0){
                this.message = "pay for the rent of your studio: money - 500, forfait mobile, tag - 25"
                this.stats[1].value -= 525
                if (this.tag_done == true){
                    this.stats[1].value -= 15
                }
            }
            // ------------------------------------random events todo--------------------------------------
            if (this.stats[2].value % 7 == 0){
                this.rd_num = 0//Math.floor(Math.random()*4)
            }
            if(this.rd_num == 0 && this.stats[2].value % 7 == 0){ // random event 0:
                
                this.content = false
                this.message = " Your classmates wants to invite you to a party, you wanna go? (y/n)"
                console.log(this.content)
            }/*
            else if (this.rd_num == 1){
                this.message = "day "+this.stats[2].value
            }
            else if (this.rd_num == 2){
                this.message = "day "+this.stats[2].value
            }
            else if (this.rd_num == 3){
                this.message = " event 3 "
                this.content = false
                this.message = " Your classmates wants to invite you to a party, you wanna go? (y/n)"
                console.log(this.content)
                //this.content = false
            }*/

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
            // you need to wait for 7 days for your rib
            if (this.click_bank == -1){
                console.log(this.lock_ofii)
                this.count += 1
                if (this.count == 7){
                    this.lock_ofii = true
                    this.message = " You just got your rib, now you can do the ofii demarche"

                }
            }
            // if you don't do the bank demarche before the 7th day, your hanpiness will drop
            if (this.stats[2].value >= 14 && this.click_bank != -1){
                this.stats[5].value -= 10
            }
            // endings
            if (this.stats[1].value <= 0){
                this.message=" You don't have any money to continue your study, you failed the game... "
            }
            if (this.stats[3].value <= 25 && this.stats[2].value >= 5){
                this.message=" You failed your semester...  GAME OVER"
            }
        },
        // ---------------------------------------------------------------------------------------
        add_object:function(times){
            times += 1
            times = times % 2
            return times
        },
        to_zero:function(){
            this.passport = 0
            this.a_naissance = 0
            this.attes_etudiant = 0
            this.attes_logement = 0
            this.photo = 0
            this.cb = 0
            this.ofii = 0
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
        mountain:function(){
            this.rd_travel = Math.floor(Math.random()*3)
            if(this.rd_travel == 0){
                this.mt1 = true
                this.message = "voyage 1"
                this.stats[0].value += 10 // health
                this.stats[1].value -= 200 // money
                this.stats[5].value += 20 // hanpiness
                this.stats[2].value += 3 // days
                this.stats[3].value -= 5 //study
            }
            else if(this.rd_travel == 1){
                this.mt2 = true
                this.message = "voyage 2"
                this.stats[0].value += 5 // health
                this.stats[1].value -= 100 // money
                this.stats[5].value += 10 // hanpiness
                this.stats[2].value += 2 // days
                this.stats[3].value -= 5 //study
            }
            else if(this.rd_travel == 2){
                this.mt3 = true
                this.message = "voyage 3"
                this.stats[0].value += 15 // health
                this.stats[1].value -= 300 // money
                this.stats[5].value += 25 // hanpiness
                this.stats[2].value += 5 // days
                this.stats[3].value -= 5 // study
            }
            this.content = false
        },
        back_from_travel:function(){
            this.content = true
            this.mt1 = false
            this.mt2 = false
            this.mt3 = false
        },
        rd_1_y:function(){
            console.log("yes")
            this.stats[3].value += 5 // study
            this.stats[4].value -= 15 // energy
            this.stats[1].value -= 10 // money
            this.stats[0].value -= 5 //health
            this.stats[5].value += 15 // hanpiness
            this.content = true
            this.rd_num = -1
        },
        rd_1_n:function(){
            console.log("no")
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

            }
            else{
                this.message = "T'as pas tous les choses necessaires... reviens quand t'es pret"
            }
            this.bank_demarche = false
            this.to_zero()
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
                this.stats[1].value -= 15 // money
            }
            else{
                this.message = "T'as pas tous les choses necessaires... reviens quand t'es pret"
            }
            this.tag_demarche = false
            this.to_zero()
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
            if (this.stats[4].value <= 0){
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
            if (this.stats[4].value <= 0){
                this.message = "You ran out of energy"
            }
            else if (this.stats[2].value % 6 != 0 && this.stats[2].value % 7 != 0){ // on weekdays
                this.message = "socializing at school, study + 2, energy - 10, hanpiness + 15"
                this.stats[3].value += 2  // study
                this.stats[4].value -= 10 // energy
                this.stats[5].value += 10 // hanpiness
            }
            else{
                this.message = " pas d'ecole aujourd'hui "
            }
        },
        // ------------------------------------ caf -------------------------------------------
        intro_caf:function(){
            if(this.lock_caf == false){
                this.message = " You can't do your caf demarche, you need to finish tasks in ofii before "
            }
            else{
                if (this.click_caf != -1){
                    this.click_caf += 1
                    if(this.click_caf % 2 != 0){
                        this.message = "The introduction of caf..."
                        this.caf_demarche = true
                    }
                    else{
                        this.caf_demarche = false
                        this.click_caf = 0 // Not to get a too big value
                    }
                    
                }
                else{
                    this.message = "You already finished the task"
                }
            }  
        },
        chk_caf:function(){
            if(this.tag_done == false){
                this.stats[1].value -= 4 // money for transport
            }
            if (this.passport == 1 && this.ofii == 1 && this.attes_etudiant == 1 && this.attes_logement == 1){
                this.message = "demarche reussi, study + 10, energy - 10, hanpiness + 10"
                this.click_caf = -1
                this.stats[3].value += 5  // study
                this.stats[4].value -= 10 // energy
                this.stats[5].value += 10 // hanpiness

            }
            else{
                this.message = "T'as pas tous les choses necessaires... reviens quand t'es pret"
            }
            this.caf_demarche = false
            this.to_zero()
        },
        // -------------------------------------------- ofii -------------------------------------------
        intro_ofii:function(){
            if(this.lock_ofii == false){
                this.message = " You can't do your ofii demarche, you need to finish tasks in bank before "
            }
            else{
                if (this.click_ofii != -1){
                    this.click_ofii += 1
                    if(this.click_ofii % 2 != 0){
                        this.message = "The introduction of ofii..."
                        this.ofii_demarche = true
                    }
                    else{
                        this.ofii_demarche = false
                        this.click_ofii = 0 // Not to get a too big value
                    }
                    
                }
                else{
                    this.message = "You already finished the task"
                }
            }  
        },
        chk_ofii:function(){
            if(this.tag_done == false){
                this.stats[1].value -= 4 // money for transport
            }
            if (this.passport == 1 && this.cb == 1 && this.attes_etudiant == 1 && this.attes_logement && this.photo == 1){
                this.message = "demarche reussi, study + 10, energy - 10, hanpiness + 10"
                this.click_ofii = -1
                this.stats[3].value += 5  // study
                this.stats[4].value -= 10 // energy
                this.stats[5].value += 10 // hanpiness

            }
            else{
                this.message = "T'as pas tous les choses necessaires... reviens quand t'es pret"
            }
            this.ofii_demarche = false
            this.to_zero()
        },
    }
})