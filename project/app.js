new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
      startGame() {
        this.gameIsRunning = true,
        this.playerHealth = 100,
        this.monsterHealth = 100,
        this.turns= []
      },
      attack() {
          var damage = this.damageCalculation(3, 10)
          this.monsterHealth -= damage
          if(this.checkResult()){
            return
          }

          this.turns.unshift({
            isPlayer: true,
            text: 'Player hits the Monster for ' + damage
          })

          damage = this.damageCalculation(5, 18)
          this.playerHealth -= damage
          this.checkResult()

          this.turns.unshift({
            isPlayer: false,
            text: 'Monster hits the Player for ' + damage
          })

      },
      specialAttack() {
        damage = this.damageCalculation(10, 20)
        this.monsterHealth -= damage
        if(this.checkResult()){
          return
        }

        this.turns.unshift({
          isPlayer: true,
          text: 'Player hits the Monster for ' + damage
        })

        this.playerHealth -= this.damageCalculation(5, 18)
        this.checkResult()

        this.turns.unshift({
          isPlayer: false,
          text: 'Monster hits the Player for ' + damage
        })
      },
      heal() {
          if(this.playerHealth <=90){
            this.playerHealth += 10
          }else {
            this.playerHealth = 100
          }
          this.turns.unshift({
            isPlayer: true,
            text: 'Player heal for 10 '
          })

          var damage = this.damageCalculation(5, 18)

          this.playerHealth -= damage
          this.checkResult()

          this.turns.unshift({
            isPlayer: false,
            text: 'Monster hits the Player for ' + damage
          })

      },
      giveUp() {
          this.gameIsRunning = false
      },
      damageCalculation(min, max) {
        return Math.max(Math.floor(Math.random() * max) + 1, min)
      },
      checkResult() {
        if(this.monsterHealth <= 0) {
          if(confirm('You win!, start a new game')){
            this.startGame()
          }else {
            this.gameIsRunning = false
          }
          return true
        }else if(this.playerHealth <= 0) {
          if(confirm('You lost!, start a new game')){
            this.startGame()
          }else {
            this.gameIsRunning = false
          }
          return true
        }
          return false
        }
      }
})
