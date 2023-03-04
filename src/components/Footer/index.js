import styled from "styled-components";

export default function Footer({ isLight, handleToogleTheme }) {
    return (
        <Wrapper>
            <button onClick={handleToogleTheme}>switch to {isLight ? "dark" : "light"} theme</button>
        </Wrapper>

    );
}
const Wrapper = styled.footer`
height:80px;
display:flex;
justify-content:center;
align-items:center;
background-color:${(props) => props.theme.mainColor};
`;