class Api {
    data;
    url;

    constructor(url) {
        this.url = url;
    }

    async getData() {
        await fetch(this.url)
            .then((response) => {
                return response.json();
            }).then((data) => {
                this.data = data.data;
                console.log(this.data)
            })
        return this.data;
    }
}

class App {
    api;
    switcher;

    constructor() {
        this.api = new Api("./data/data.json");
        this.api.getData().then(() => {
            this.switcher = new Switcher(this, this.api.data)
        });
    }

}

class Switcher {
    protfolio;
    app;
    cleaner;

    constructor(app, data) {
        this.app = app;
        this.data = data;
        this.protfolio = new Protfolio(this.data[0].english, this.app)
        this.cleaner = new Cleaner();

    }

    switch(language) {
        this.cleaner.clean("body");
        this.protfolio = new Protfolio(this.data[0][language], this.app);
    }
}

class Cleaner {
    clean(whereToClean) {
        document.querySelector(whereToClean).innerHTML = "";
    }
}

class Renderer {
    render(whereTORender, whatToRender) {
        (whereTORender).appendChild(whatToRender);
    }
}

class Protfolio {
    data;
    body;
    app;

    constructor(data, app) {
        this.data = data;
        this.app = app
        this.body = new Body(this, data, this.app)
    }
}

class Body {
    renderer
    nav;
    banner;
    skills;
    projects;
    protfolio;
    data;
    app
    contact;

    constructor(protfolio, data, app) {
        this.protfolio = protfolio
        this.data = data;
        this.app = app;
        this.renderer = new Renderer();
        this.contact = new Contact(this.data[0].contact);
        this.nav = new Nav(this.data[0].nav, this.app, this.contact);
        this.banner = new Banner(this.data[0].banner);
        this.skills = new Skills(this.data[0].skills);
        this.projects = new Projects(this.data[0].projects, this);

        this.render();
    }

    render() {
        this.renderer.render(document.querySelector("body"), this.nav.htmlElement);
        this.renderer.render(document.querySelector("body"), this.contact.htmlElement);
        this.renderer.render(document.querySelector("body"), this.banner.htmlElement);
        this.renderer.render(document.querySelector("body"), this.skills.htmlElement);
        this.renderer.render(document.querySelector("body"), this.projects.htmlElement);
    }
}

class Nav {
    data;
    app;

    constructor(data, app, contactApp) {
        this.data = data;
        this.app = app;
        this.contactApp = contactApp;
        this.active = false;

        this.htmlElement = document.createElement("nav");
        this.htmlElement.classList = "nav";
        console.log(this.data);

        this.renderSectionOne();
        this.renderSectionSecond(this.data);
        this.article.appendChild(this.sectionSecond);
        this.renderSectionThird(this.data);
    }

    renderSectionOne() {
        this.article = document.createElement("article");
        this.article.classList = "nav__container";
        this.htmlElement.appendChild(this.article);

        this.sectionOne = document.createElement("section");
        this.sectionOne.classList = "nav__section nav__section--first";
        this.article.appendChild(this.sectionOne);

        this.menuButtonContainer = document.createElement("div");
        this.menuButtonContainer.classList = "nav__menuButtonContainer";
        this.sectionOne.appendChild(this.menuButtonContainer);

        this.navMenuButton = document.createElement("div");
        this.navMenuButton.classList = "nav__menuButton";
        this.menuButtonContainer.appendChild(this.navMenuButton);
        this.navMenuButton.onclick = () => {
            console.log(this.active)
            if (this.active === false) {
                this.menuOpen(this.data);
            }

            else {
                this.menuClose();
            }
            console.log(this.active)
        };

        this.navBarsOne = document.createElement("div");
        this.navBarsOne.classList = "nav__bars nav__bars--1";
        this.navMenuButton.appendChild(this.navBarsOne);

        this.navBarsTwo = document.createElement("div");
        this.navBarsTwo.classList = "nav__bars nav__bars--2";
        this.navMenuButton.appendChild(this.navBarsTwo);

        this.navBarsThree = document.createElement("div");
        this.navBarsThree.classList = "nav__bars nav__bars--3";
        this.navMenuButton.appendChild(this.navBarsThree);
    }

    renderMobileMenu(data) {
        this.menu = document.createElement("ul");
        this.menu.classList = "nav__menuContainer";
        this.sectionOne.appendChild(this.menu);

        let navLinks = data[0]["links"];
        for (let i = 0; i < navLinks.length; i++) {
            this.menuListItem = document.createElement("li");
            this.menuListItem.classList = "nav__menuListItem";
            this.menu.appendChild(this.menuListItem);

            this.menuLink = document.createElement("a");
            this.menuLink.classList = "nav__menuLink";
            this.menuLink.href = "index.html#" + navLinks[i].link
            this.menuLink.innerText = navLinks[i].title;
            this.menuListItem.appendChild(this.menuLink);
        }
    }

    menuOpen(data) {
        this.navBarsOne.style.animationName = "barOneCross";
        this.navBarsTwo.style.animationName = "barTwoCross";
        this.navBarsThree.style.animationName = "barThreeCross";

        this.renderMobileMenu(data);
        this.menu.style.animationName = "navDropdownExpand";
        clearInterval(this.timeAdded);
        this.active = true;
    }

    menuClose() {
        this.menu.style.animationName = "navDropdownRetract";
        this.timeAdded = setInterval(() => {
            this.menu.remove();
        }, 1200);

        this.navBarsOne.style.animationName = "barOne";
        this.navBarsTwo.style.animationName = "barTwo";
        this.navBarsThree.style.animationName = "barThree";
        this.active = false;
    }

    renderSectionSecond(data) {
        this.sectionSecond = document.createElement("section");
        this.sectionSecond.classList = "nav__section nav__section--second";

        let navLinks = data[0]["links"];
        for (let i = 0; i < navLinks.length; i++) {
            this.link = document.createElement("a");
            this.link.classList = "nav__links";
            this.link.href = "#" + navLinks[i].link
            this.link.innerText = navLinks[i].title;
            this.sectionSecond.appendChild(this.link);
        }
    }

    renderSectionThird(data) {
        let flagData = data[0]["flags"];
        this.sectionThird = document.createElement("section");
        this.sectionThird.classList = "nav__section nav__section--third";
        this.article.appendChild(this.sectionThird);

        this.flagButton = document.createElement("img");
        this.flagButton.classList = "nav__flag";
        this.flagButton.src = flagData[0].img;
        this.flagButton.alt = flagData[0].alt;
        this.flagButton.id = flagData[0].language;
        this.sectionThird.appendChild(this.flagButton);
        this.flagButton.onclick = () => {
            this.app.switcher.switch(flagData[0].language);
        };

        this.contactButton = document.createElement("button");
        this.contactButton.classList = "nav__contactButton";
        this.contactButton.innerText = "Contact";
        this.sectionThird.appendChild(this.contactButton);
        this.contactButton.onclick = () => {
            this.contactApp.displayCard();
        };
    }

    flagButtonPressed(language) {
        if (language === "dutch") {
            let switchLanguage = this.data[0].dutch;
            this.app.switcher.switch(switchLanguage)
        }

        if (language === "english") {
            let switchLanguage = this.data[0].english;
            this.app.switcher.switch(switchLanguage);
        }
    }
}

class Contact {
    data;

    constructor(data) {
        this.data = data;

        this.htmlElement = document.createElement("section");
        this.htmlElement.classList = "contact";

        this.makeCard(this.data);
    }

    makeCard(data) {
        this.widget = document.createElement("section");
        this.widget.classList = "contact__widget";
        this.htmlElement.appendChild(this.widget);

        this.figure = document.createElement("figure");
        this.figure.classList = "contact__figure";
        this.widget.appendChild(this.figure)

        this.img = document.createElement("img");
        this.img.classList = "contact__img";
        this.img.src = data[0].image;
        this.img.alt = data[0].alt;
        this.figure.appendChild(this.img);

        this.list = document.createElement("ul");
        this.list.classList = "contact__list";
        this.widget.appendChild(this.list);

        let links = data[0]["links"];
        for (let i = 0; i < links.length; i++) {
            this.listItem = document.createElement("li");
            this.listItem.classList = "contact__listItem";

            this.icon = document.createElement("i");
            this.icon.classList = "contact__icon " + links[i].icon;

            this.link = document.createElement("a");
            this.link.classList = "contact__link";
            this.link.href = links[i].link;
            this.link.innerText = links[i].title;

            this.listItem.appendChild(this.icon);
            this.list.appendChild(this.listItem);
            this.listItem.appendChild(this.link);
        }

        this.closeButton = document.createElement("button");
        this.closeButton.classList = "contact__closeButton";
        this.closeButton.innerText = "X";
        this.widget.appendChild(this.closeButton);
        this.closeButton.onclick = () => {
            this.hideCard();
        };
    }

    displayCard() {
        this.htmlElement.style.display = "flex";
    }

    hideCard() {
        this.htmlElement.style.display = "none";
    }
}

class Banner {
    data;

    constructor(data) {
        this.data = data;

        this.htmlElement = document.createElement("header");
        this.htmlElement.classList = "banner";

        // this.createWidgets(this.data[0].widgets);

        this.widgetContainer = document.createElement("article");
        this.widgetContainer.classList = "banner__widgetContainer";
        this.htmlElement.appendChild(this.widgetContainer);

        this.createWidgetOne(this.data);

        for (let i = 0; i < 3; i++) {
        }
    }

    createWidgetOne(data) {
        let widgetData = data[0]["widgets"];
        let iconData = data[0]["icons"];
        let buttonData = data[0]["button"];
        console.log(iconData);

        this.widget = document.createElement("ul");
        this.widget.classList = "banner__widget";
        this.widgetContainer.appendChild(this.widget);

        this.widgetBanner = document.createElement("li");
        this.widgetBanner.classList = "banner__widgetBanner";
        this.widget.appendChild(this.widgetBanner);

        this.widgetFigureOne = document.createElement("figure");
        this.widgetFigureOne.classList = "banner__widgetFigure";
        this.widgetBanner.appendChild(this.widgetFigureOne);

        this.widgetIconContainer = document.createElement("section");
        this.widgetIconContainer.classList = "banner__iconContainer";
        this.widgetFigureOne.appendChild(this.widgetIconContainer);

        this.widgetIconsContainer = document.createElement("div");
        this.widgetIconsContainer.classList = "banner__iconsContainer";
        this.widgetIconContainer.appendChild(this.widgetIconsContainer);

        this.widgetImg = document.createElement("img");
        this.widgetImg.classList = "banner__widgetImg";
        this.widgetImg.src = data[0].background;
        this.widgetImg.alt = data[0].alt;
        this.widgetFigureOne.appendChild(this.widgetImg);

        for (let i = 0; i < iconData.length; i++) {
            this.widgetIcon = document.createElement("i");
            this.widgetIcon.classList = "banner__widgetIcon " + iconData[i].icon + " banner__widgetIcon--" + i;
            this.widgetIconsContainer.appendChild(this.widgetIcon);
        }

        this.widgetWidgets = document.createElement("ul");
        this.widgetWidgets.classList = "banner__widgetsContainer";
        this.widgetBanner.appendChild(this.widgetWidgets);

        for (let i = 0; i < widgetData.length; i++) {
            this.widgetWidget = document.createElement("li");
            this.widgetWidget.classList = "banner__widgetWidget";
            this.widgetWidgets.appendChild(this.widgetWidget);

            this.widgetWidgetTitle = document.createElement("h2");
            this.widgetWidgetTitle.classList = "banner__widgetWidgetTitle";
            this.widgetWidgetTitle.innerText = widgetData[i].title;
            this.widgetWidget.appendChild(this.widgetWidgetTitle);
        }

        this.widgetText = document.createElement("li");
        this.widgetText.classList = "banner__widgetText";
        this.widget.appendChild(this.widgetText);

        this.widgetHeader = document.createElement("header");
        this.widgetHeader.classList = "banner__widgetHeader";
        this.widgetText.appendChild(this.widgetHeader);

        this.widgetTitle = document.createElement("h2");
        this.widgetTitle.classList = "banner__widgetTitle";
        this.widgetTitle.innerText = data[0].name
        this.widgetHeader.appendChild(this.widgetTitle);

        this.widgetQaul = document.createElement("h2");
        this.widgetQaul.classList = "banner__widgetQaul";
        this.widgetQaul.innerText = data[0].qaul
        this.widgetHeader.appendChild(this.widgetQaul);

        this.widgetParagraph = document.createElement("section");
        this.widgetParagraph.classList = "banner__widgetParagraph";
        this.widgetText.appendChild(this.widgetParagraph);

        this.widgetDescriptionOne = document.createElement("p");
        this.widgetDescriptionOne.classList = "banner__widgetDesc";
        this.widgetDescriptionOne.innerText = data[0].description
        this.widgetParagraph.appendChild(this.widgetDescriptionOne);

        this.widgetButtonContainer = document.createElement("section");
        this.widgetButtonContainer.classList = "banner__widgetButtonContainer";
        this.widgetText.appendChild(this.widgetButtonContainer);

        this.widgetButton = document.createElement("a");
        this.widgetButton.classList = "banner__widgetButton";
        this.widgetButton.innerText = buttonData[0].buttonText;
        this.widgetButton.href = "#" + buttonData[0].link;
        this.widgetButtonContainer.appendChild(this.widgetButton);
    }
}

class Skills {
    data;

    constructor(data) {
        this.data = data;

        this.htmlElement = document.createElement("article");
        this.htmlElement.classList = "skills";
        this.htmlElement.id = this.data[0].id;

        this.skill = document.createElement("h2");
        this.skill.classList = "skills__skill";
        this.skill.innerText = this.data[0].title;

        this.htmlElement.appendChild(this.skill);

        this.createWidgets(this.data[0].widgets)
    }

    createWidgets(data) {
        this.container = document.createElement("ul");
        this.container.classList = "skills__list";

        this.htmlElement.appendChild(this.container);

        for (let i = 0; i < data.length; i++) {
            this.listItem = document.createElement("li");
            this.listItem.classList = "skills__listItem";

            this.img = document.createElement("img");
            this.img.classList = "skills__logo";
            this.img.src = data[i].img;
            this.img.alt = data[i].alt;

            this.title = document.createElement("p");
            this.title.classList = "skills__title";
            this.title.innerText = data[i].title;

            this.container.appendChild(this.listItem);
            this.listItem.appendChild(this.img);
            this.listItem.appendChild(this.title);
        }
    }
}

class Projects {
    data;
    modal;
    body;

    constructor(data, body) {
        this.data = data;
        this.body = body

        this.htmlElement = document.createElement("article");
        this.htmlElement.classList = "projects";
        this.htmlElement.id = this.data[0].id;

        this.title = document.createElement("h2");
        this.title.classList = "projects__title";
        this.title.innerText = this.data[0].title

        this.htmlElement.appendChild(this.title);

        this.createWidgets(this.data[0].widgets);
    }

    createWidgets(data) {
        this.container = document.createElement("ul");
        this.container.classList = "projects__projects";

        this.htmlElement.appendChild(this.container);

        for (let i = 0; i < data.length; i++) {
            this.listItem = document.createElement("li");
            this.listItem.classList = "projects__project";

            this.img = document.createElement("img");
            this.img.classList = "projects__img";
            this.img.src = data[i].img;
            this.img.alt = data[i].alt;

            this.projectTag = document.createElement("section");
            this.projectTag.classList = "projects__tag";

            this.projectName = document.createElement("h2");
            this.projectName.classList = "projects__name";
            this.projectName.innerText = data[i].title;

            this.projectButton = document.createElement("button");
            this.projectButton.classList = "projects__moreInfo";
            this.projectButton.innerText = data[i].buttonText;

            this.projectButton.onclick = () => {
                this.modalActive(i)
            }

            this.container.appendChild(this.listItem);
            this.listItem.appendChild(this.img);
            this.listItem.appendChild(this.projectTag);
            this.projectTag.appendChild(this.projectName);
            this.projectTag.appendChild(this.projectButton);
        }
    }

    modalActive(id) {
        this.modal = new Modal(this.data[0].widgets[id], this.body, this);
        this.modal.htmlElement.style.display = "flex";
        this.body.renderer.render(document.querySelector("body"), this.modal.htmlElement);

        this.body.nav.htmlElement.style.display = "none";
        this.body.banner.htmlElement.style.display = "none";
        this.body.skills.htmlElement.style.display = "none";
        this.body.projects.htmlElement.style.display = "none";

        window.scrollTo(0, 0);
    }

    modalInactive() {
        this.modal.htmlElement.remove();

        this.body.nav.htmlElement.style.display = "flex";
        this.body.banner.htmlElement.style.display = "flex";
        this.body.skills.htmlElement.style.display = "block";
        this.body.projects.htmlElement.style.display = "block";
    }
}

class Modal {
    data;
    projects;

    constructor(widgets, body, projects) {
        this.widgets = widgets;
        this.body = body
        this.projects = projects;

        this.htmlElement = document.createElement("div");
        this.htmlElement.classList = "modal__container";

        this.modalBackDrop = document.createElement("div");
        this.modalBackDrop.classList = "modal__backdrop";
        this.modalBackDrop.style.backgroundImage = "url('" + this.widgets.img + "')";
        this.htmlElement.appendChild(this.modalBackDrop);

        this.modal = document.createElement("article");
        this.modal.classList = "modal";
        this.htmlElement.appendChild(this.modal);

        this.createHeader(this.widgets);
        this.createMain(this.widgets.modal)
    }

    createHeader(data) {
        this.header = document.createElement("header");
        this.header.classList = "modal__header";

        this.modal.appendChild(this.header);

        this.sectionOne = document.createElement("section");
        this.sectionOne.classList = "modal__section modal__section--first";

        this.header.appendChild(this.sectionOne);

        this.sectionSecond = document.createElement("section");
        this.sectionSecond.classList = "modal__section modal__section--second";

        this.header.appendChild(this.sectionSecond);

        this.projectTag = document.createElement("div");
        this.projectTag.classList = "modal__tag";

        this.sectionSecond.appendChild(this.projectTag);

        this.projectName = document.createElement("h2");
        this.projectName.classList = "modal__name";
        this.projectName.innerText = data.title

        this.projectTag.appendChild(this.projectName);

        this.sectionThird = document.createElement("section");
        this.sectionThird.classList = "modal__section modal__section--third";

        this.header.appendChild(this.sectionThird);

        this.exitButton = document.createElement("button");
        this.exitButton.classList = "modal__exitButton"
        this.exitButton.innerText = "x";

        this.exitButton.onclick = () => {
            this.projects.modalInactive();
        }

        this.sectionThird.appendChild(this.exitButton);

    }

    createMain(data) {
        this.main = document.createElement("main");
        this.main.classList = "modal__main";

        this.modal.appendChild(this.main);

        this.sectionLeft = document.createElement("section");
        this.sectionLeft.classList = "modal__sections modal__sections--left";

        this.main.appendChild(this.sectionLeft);

        this.slider = new Slider(data[0]["slider"], this);
        this.sectionLeft.appendChild(this.slider.slider);

        this.widgetContainer = document.createElement("div");
        this.widgetContainer.classList = "modal__widgetContainer";

        this.sectionLeft.appendChild(this.widgetContainer);

        this.language = document.createElement("ul");
        this.language.classList = "modal__language";

        this.widgetContainer.appendChild(this.language);

        let languageData = data[0]["language"];

        for (let i = 0; i < languageData.length; i++) {
            this.languageListItem = document.createElement("li");
            this.languageListItem.classList = "modal__languageListItem";

            this.language.appendChild(this.languageListItem);

            this.languageImg = document.createElement("img");
            this.languageImg.classList = "modal__languageImg";
            this.languageImg.src = languageData[i].img;

            this.languageListItem.appendChild(this.languageImg);
        }

        this.linkModal = document.createElement("ul");
        this.linkModal.classList = "modal__linkModal";

        this.widgetContainer.appendChild(this.linkModal);

        let linkData = data[0]["links"];

        for (let i = 0; i < linkData.length; i++) {
            this.linkList = document.createElement("li");
            this.linkList.classList = "modal__linkList";

            this.linkImg = document.createElement("img");
            this.linkImg.classList = "modal__linkImg";
            this.linkImg.src = linkData[i].img

            this.link = document.createElement("a");
            this.link.classList = "modal__link";
            this.link.innerText = linkData[i].name;
            this.link.href = linkData[i].link;
            this.link.target = "_blank";

            this.linkModal.appendChild(this.linkList);
            this.linkList.appendChild(this.linkImg);
            this.linkList.appendChild(this.link);
        }

        let assignmentData = data[0]["assignment"];

        this.sectionRight = document.createElement("section");
        this.sectionRight.classList = "modal__sections modal__sections--right";

        this.main.appendChild(this.sectionRight);

        this.assignment = document.createElement("section");
        this.assignment.classList = "modal__assignment";

        this.sectionRight.appendChild(this.assignment);

        this.assignmentH2 = document.createElement("h2");
        this.assignmentH2.classList = "modal__assignmentH2";
        this.assignmentH2.innerText = assignmentData[0].title

        this.assignment.appendChild(this.assignmentH2);

        this.assignmentPContainer = document.createElement("div");
        this.assignmentPContainer.classList = "modal__assignmentContainer";
        this.assignment.appendChild(this.assignmentPContainer);

        this.assignmentParagraph = document.createElement("p");
        this.assignmentParagraph.classList = "modal__assignmentP";
        this.assignmentParagraph.innerText = assignmentData[0].text

        this.assignmentPContainer.appendChild(this.assignmentParagraph);

        let descriptionData = data[0]["description"];

        this.description = document.createElement("section");
        this.description.classList = "modal__description";

        this.sectionRight.appendChild(this.description);

        this.descriptionH2 = document.createElement("h2");
        this.descriptionH2.classList = "modal__descriptionH2";
        this.descriptionH2.innerText = descriptionData[0].title;
        this.description.appendChild(this.descriptionH2);

        this.descriptionPContainer = document.createElement("div");
        this.descriptionPContainer.classList = "modal__descriptionContainer";
        this.description.appendChild(this.descriptionPContainer);

        for (let i = 0; i < descriptionData[0].text.length; i++) {
            this.descriptionParagraph = document.createElement("p");
            this.descriptionParagraph.classList = "modal__descriptionP";
            this.descriptionParagraph.innerText = descriptionData[0].text[i].text
            this.descriptionPContainer.appendChild(this.descriptionParagraph);
        }
    }
}

class Slider {
    sliderData;
    modal;

    constructor(newSliderData, newModal) {
        this.sliderData = newSliderData;
        this.modal = newModal;

        this.sliderIndex = 0;
        this.makeSlider(this.sliderData);
    }

    makeSlider(data) {
        this.slider = document.createElement("ul");
        this.slider.classList = "modal__slider";

        this.buttonContainerOne = document.createElement("li");
        this.buttonContainerOne.classList = "modal__sliderButtonContainer modal__sliderButtonContainer--1";
        this.slider.appendChild(this.buttonContainerOne);

        this.buttonPrev = document.createElement("button");
        this.buttonPrev.classList = "modal__sliderButton";
        this.buttonPrev.innerText = "<";
        this.buttonContainerOne.appendChild(this.buttonPrev);
        this.buttonPrev.onclick = () => {
            this.prevButtonPressed(data);
        };

        this.renderImg(data);

        this.buttonContainerTwo = document.createElement("li");
        this.buttonContainerTwo.classList = "modal__sliderButtonContainer modal__sliderButtonContainer--2";
        this.slider.appendChild(this.buttonContainerTwo);

        this.buttonNext = document.createElement("button");
        this.buttonNext.classList = "modal__sliderButton";
        this.buttonNext.innerText = ">";
        this.buttonContainerTwo.appendChild(this.buttonNext);
        this.buttonNext.onclick = () => {
            this.nextButtonPressed(data);
        };

        this.renderDots(data);
    }

    renderImg(data) {
        this.sliderImgContainer = document.createElement("li");
        this.sliderImgContainer.classList = "modal__sliderImgContainer";
        this.slider.appendChild(this.sliderImgContainer);

        this.sliderImg = document.createElement("img");
        this.sliderImg.classList = "modal__sliderImg";
        this.sliderImg.src = data[this.sliderIndex].img;
        this.sliderImgContainer.appendChild(this.sliderImg);
    }

    renderDots(data) {
        this.sliderImgDotContainer = document.createElement("li");
        this.sliderImgDotContainer.classList = "modal__sliderImgDotContainer";
        this.slider.appendChild(this.sliderImgDotContainer);
        for (let i = 0; i < data.length; i++) {

            this.sliderImgDot = document.createElement("button");
            this.sliderImgDot.classList = "modal__sliderDot";
            this.sliderImgDot.id = i;
            this.sliderImgDotContainer.appendChild(this.sliderImgDot);
            this.sliderImgDot.onclick = () => {
                this.dotPressed(i);
            };

            if (this.sliderImgDot.id == this.sliderIndex) {
                this.sliderImgDot.classList = "modal__sliderDot modal__sliderDot--active";
            }
        }
    }

    nextButtonPressed(data) {
        this.sliderIndex += 1;

        if (this.sliderIndex >= data.length) {
            this.sliderIndex = 0;
        }
        this.sliderImgContainer.remove();
        this.sliderImgDotContainer.remove();
        this.renderImg(this.sliderData);
        this.renderDots(this.sliderData);
    }

    prevButtonPressed(data) {
        this.sliderIndex -= 1;

        if (this.sliderIndex <= -1) {
            this.sliderIndex = data.length - 1;
        }
        this.sliderImgContainer.remove();
        this.sliderImgDotContainer.remove();
        this.renderImg(this.sliderData);
        this.renderDots(this.sliderData);
    }

    dotPressed(index) {
        this.sliderIndex = index;

        this.sliderImgContainer.remove();
        this.sliderImgDotContainer.remove();
        this.renderImg(this.sliderData);
        this.renderDots(this.sliderData);
    }
}

const app = new App();