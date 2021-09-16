import NavBar from "../components/navbar"

const withNav = (WrapedComp) => {
    return <>
        <NavBar />
        <WrapedComp />
    </>
}

export { withNav };