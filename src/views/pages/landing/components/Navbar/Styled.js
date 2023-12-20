import styled from '@emotion/styled';

export const Buttons = styled.button`
    background-color: black;
    padding: 7px 15px;
    border: none;
    font-size: 1rem;
    font-weight: 600;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: white;
    border-radius: 3px;
    cursor: pointer;
    &:hover{
        background-color: #F06A6A;
        color: black;
    }
`;
/* border-bottom: ${(props) => (props.isButtonClicked ? '2px solid black' : '2px solid transparent')}; */

export const NewButton = styled.button`
    padding: 3px 5px;
    border: none;
    border-radius: 3px;
    background-color: #796EFF;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 11px;
    font-weight: 500;
`

export const FirstContainers = styled.div`
    display: flex;
    position: relative;
    top: 52px;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 52px);
    width: 100%;
    background-color: #EEEEEE;
    @media screen and (max-width : 1000px){
        height: 100%;
        top: 0px;
    }
`;

export const SecondContainers = styled.div`
    display: flex;
    height: calc(100vh - 52px);
    justify-content: center;
    align-items: center;
    position: relative;
    top: 52px;
    width: 100%;
    background-color: #EEEEEE;
    @media screen and (max-width : 1000px){
        height: 100%;
        top: 0px;
    }
`;