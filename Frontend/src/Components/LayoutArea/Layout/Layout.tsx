import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">

            

            <header>
                <Header />
            </header>
            <nav>
                <Menu />
            </nav>

            <main>
                <Routing />
            </main>

        </div>
    );
}

export default Layout;
