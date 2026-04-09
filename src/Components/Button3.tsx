import styled from 'styled-components';

type Button3Props = {
  text?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

function Button3({ text = 'Claim', onClick, type = 'button', disabled = false }: Button3Props) {
  return (
    <StyledButton type={type} onClick={onClick} disabled={disabled}>
      {text}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  border: none;
  border-radius: 999px;
  background: #f28c28;
  color: #fff;
  padding: 0.8rem 1.35rem;
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 24px rgba(242, 140, 40, 0.32);
    filter: brightness(1.03);
  }

  &:disabled {
    background: #a8a8a8;
    color: #f3f3f3;
    cursor: not-allowed;
    box-shadow: none;
    filter: none;
    transform: none;
  }
`;

export default Button3;
