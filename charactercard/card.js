    const character = {
      name: "Snortleblat",
      class: "Swamp Beast Diplomat",
      level: 5,
      health: 100,
      image: 'snort.png',
      attacked() {
        if (this.health >= 20) {
          this.health -= 20;
        } else {
            alert('Character Died');
        }
      },
      levelUp() {
        this.level += 1;
        this.health += 20;
      }
    };

    let image = document.querySelector('.image');
    image.setAttribute('src', character.image);
    image.setAttribute('alt', character.name);
    document.querySelector('.name').textContent = character.name;
    document.querySelector('#class').textContent = character.class;

    function updateStats() {
        document.querySelector('#level').textContent = character.level;
        document.querySelector('#health').textContent = character.health;
    }

    let attacked_btn = document.querySelector('#attacked');
    let levelup_btn = document.querySelector('#levelup');

    attacked_btn.addEventListener('click', function(){
        character.attacked();
        updateStats();
    })

    levelup_btn.addEventListener('click', function(){
        character.levelUp();
        updateStats();
    })

    updateStats();
    