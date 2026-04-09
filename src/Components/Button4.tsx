import styled from 'styled-components';

type Button4Props = {
  text?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

function Button4({ text = 'Inquire', onClick, type = 'button' }: Button4Props) {
  return (
    <StyledButton type={type} onClick={onClick}>
      {text}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  border: none;
  border-radius: 999px;
  background: #2c6bdf;
  color: #fff;
  padding: 0.8rem 1.35rem;
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 24px rgba(44, 107, 223, 0.32);
    filter: brightness(1.03);
  }
`;

export default Button4;
