import "./Login.css";
import Image from "next/image";
import LoginImage from "../../../assets/reb7e.png"

export default function Login() {
    return (
        <div className="main">
            <input type="checkbox" id="chk" aria-hidden="true"/>

            <div className="welcome">
                <Image src={LoginImage} alt="Cartoon avocado character with a bowler hat and mustache, holding a cane"/>
                <h1>
                    AgriTech
                </h1>
                <h2>
                    Avocado Tree Detection System
                </h2>
            </div>

            <div className="login">
                <form>
                    <label htmlFor="chk" aria-hidden="true">Login</label>
                    <input type="email" name="email" placeholder="Account ID" required=""/>
                    <input type="password" name="pswd" placeholder="Password" required=""/>
                    <button>Login</button>
                </form>
            </div>
        </div>
    );
}