const article = document.querySelector(".article");
const sections = article.querySelectorAll("section");
const navLinks = document.querySelectorAll(".side-links a");

article.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        if(article.scrollTop>=section.offsetTop-120){

            current=section.id;

        }

    });

    navLinks.forEach(link=>{

        link.classList.toggle(
            "active",
            link.getAttribute("href")==="#"+current
        );

    });

});


navLinks.forEach(link=>{

    link.addEventListener("click",(e)=>{

        e.preventDefault();

        const target=document.querySelector(
            link.getAttribute("href")
        );

        article.scrollTo({

            top:target.offsetTop,

            behavior:"smooth"

        });

    });

});



const fadeObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        entry.target.classList.toggle(
            "show",
            entry.isIntersecting
        );

    });

},{
    root:article,
    threshold:0.25
});

sections.forEach(section=>{

    fadeObserver.observe(section);

});