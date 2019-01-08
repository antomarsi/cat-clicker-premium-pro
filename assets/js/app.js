var model = {
    currentCat: null,
    adminMode: false,
    cats: [
        {name: "Cat 1", clickCount: 0, "img": "assets/img/cat_1.jpg"},
        {name: "Cat 2", clickCount: 0, "img": "assets/img/cat_2.jpg"},
        {name: "Cat 3", clickCount: 0, "img": "assets/img/cat_1.jpg"},
        {name: "Cat 4", clickCount: 0, "img": "assets/img/cat_2.jpg"},
        {name: "Cat 5", clickCount: 0, "img": "assets/img/cat_1.jpg"},
    ]
}

var octopus = {
    init: function() {
        model.currentCat = model.cats[0];
        catListView.init();
        catView.init();
    },
    getCurrentCat: function() {
        return model.currentCat;
    },
    getCats: function(){
        return model.cats;
    },
    setCurrentCat: function(cat) {
        model.currentCat = cat;
        catView.render();
    },
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    },
    closeAdminMode: function() {
        $("#form-cat").addClass('d-none');
    },
    openAdminMode: function() {
        $("#form-cat").removeClass('d-none');        
    },
    saveCurrentCat: function(cat) {
        model.currentCat.name = cat.name;
        model.currentCat.img = cat.img;
        model.currentCat.clickCount = cat.clickCount;
        console.log(cat);
        this.closeAdminMode();
        catListView.render();
        catView.render();
    }
}

var catListView = {
    init: function() {
        this.catListElem = document.getElementById("list-cats");
        this.render();
    },
    render: function() {
        var cats = octopus.getCats();
        this.catListElem.innerHTML = '';
        for (var index = 0; index < cats.length; index++) {
            var cat = cats[index];
            var elem = document.createElement('li');
            var link = document.createElement('a');
            link.textContent = cat.name;
            link.classList.add("btn");
            link.setAttribute('role', 'button');
            link.addEventListener('click', (function(cat) {
                return function() { octopus.setCurrentCat(cat); }
            })(cat));
            elem.appendChild(link);
            this.catListElem.append(elem);
        }
    }
}

var catView = {
    init: function() {
        this.catName = document.getElementById("cat-name");
        this.catCounter = document.getElementById("cat-counter");
        this.catImage = document.getElementById("cat-image");
        // form data
        this.formCat = $("form#form-cat");
        this.formCatName = $("#form-cat-name");
        this.formCatImg = $("#form-cat-image");
        this.formCatCounter = $("#form-cat-counter");

        this.catImage.addEventListener("click", function(e) {
            octopus.incrementCounter();
        })
        this.catForm = document.getElementById("form-cat");
        this.render();
        this.formCat.submit(function(event) {
            event.preventDefault();
            var data = $(this).serializeArray();
            octopus.saveCurrentCat({
                name: data[0].value,
                img: data[1].value,
                clickCount: data[2].value
            });
        });
    },
    render: function() {
        var currentCat = octopus.getCurrentCat();
        this.catName.textContent = currentCat.name;
        this.catCounter.textContent = currentCat.clickCount;
        this.catImage.src = currentCat.img;
        this.formCatName.val(currentCat.name);
        this.formCatImg.val(currentCat.img);
        this.formCatCounter.val(currentCat.clickCount);
    }
}

$("document").ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
    octopus.init();
});
