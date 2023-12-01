import React from "react";

function ContactUs(){
    return(
        <div className="mt-8 flex items-center justify-around">
            <div className="mb-24">
                <h1 className="text-4xl text-center mb-4">Contact Us</h1>
                <form method="post" action="mailto:Myemail@mail.co.uk" encType="text/plain" className="max-w-md mx-auto my-2">
                    <input type="text" name="name" placeholder="full name" required autoComplete="off"/>
                    <input type="email" name="username" placeholder="username@email.com" required autoComplete="off" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" title="Valid email-id"/>
                    <textarea name="message" placeholder="Type your query here..." className="w-full border my-1 py-2 px-3 rounded-2xl" cols="58" rows="5"></textarea>
                    <button type="submit" className="mt-2 w-full bg-red-500 text-white p-2 rounded-2xl">Submit</button>
                </form>
            </div>
        </div>

    );
}

export default ContactUs;