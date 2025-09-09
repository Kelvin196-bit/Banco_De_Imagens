const Layout = ({children, SetPage}) => {
    return ( 
    <div>
        <nav>
            <button className="w-1/2 h-16 bg-green-500 font-bold cursor-pointer hover:shadow-lg duration-500 hover:bg-green-600 transition transform" onClick={() => SetPage("cadastro")}>Cadastrar</button>
            <button className="w-1/2 h-16 bg-blue-500 font-bold cursor-pointer hover:shadow-lg duration-500 hover:bg-blue-700 transition transform" onClick={() => SetPage("exibir")}>Exibir</button>
        </nav>
        <hr/>
        <div>
            {children}
        </div>
    </div> );
}
 
export default Layout;