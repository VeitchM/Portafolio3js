import styled from 'styled-components'

export const Wrapper1 = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 48px;
    right: 48px;
    z-index: 99999;
    opacity: 1;
    color: var(--primary-color);

    @media screen and ( max-width: 968px){
        right: 13px;
        top:10px;
    }
`;

export const Wrapper2 = styled(Wrapper1)`
    top: 96px;

    @media screen and ( max-width: 968px){
        top: 40px;
    }
    `

export const SymbolWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width:24px;

`

export const ToggleButton = styled.button`
cursor: pointer;
  position: relative;
  width: 56px;
  height: 28px;
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 50px;
  margin: 0px 8px;
  border: none;
  color: var(--primary-color);
  background-color: currentColor;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  
  @media screen and ( max-width: 968px){
    height: 24px;
    width: 40px;
    margin: 0px 4px;
  }

  
:hover{
    transform: scale(0.9);
  }
  

`


