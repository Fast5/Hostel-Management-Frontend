import React from "react";

function Footer(){
    return(
        <footer className="flex absolute left-0 bottom-0 h-16 w-full gap-4 justify-center items-center bg-amber-500 text-white border-t">
            <span>© 2023 Fast5, inc.</span>
            <span>Contact us on: </span>
            <div className="flex gap-4">
                <a href="mailto:aryanwork10@gmail.com" target="_blank" rel="noreferrer"><i className="fa-solid fa-envelope"></i></a>
                <a href="https://github.com/AryanShah874" target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i></a>
                <a href="https://www.linkedin.com/in/aryan-shah-10b52b252" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin"></i></a>
            </div>  
        </footer>
    );
}

export default Footer;