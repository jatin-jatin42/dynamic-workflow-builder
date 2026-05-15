import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${({ theme }) => theme.colors.bgDeep};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.fonts.sans};
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
  }

  #root { display: flex; flex-direction: column; height: 100vh; }

  /* ── React Flow canvas & controls ── */
  .react-flow { background: ${({ theme }) => theme.colors.bgDeep} !important; }

  .react-flow__minimap {
    background: ${({ theme }) => theme.colors.bgSurface} !important;
    border: 1px solid ${({ theme }) => theme.colors.border} !important;
    border-radius: ${({ theme }) => theme.radii.md} !important;
  }

  .react-flow__controls {
    background: ${({ theme }) => theme.colors.bgSurface} !important;
    border: 1px solid ${({ theme }) => theme.colors.border} !important;
    border-radius: ${({ theme }) => theme.radii.md} !important;
    box-shadow: none !important;
    overflow: hidden;
  }

  .react-flow__controls-button {
    background: transparent !important;
    border-color: ${({ theme }) => theme.colors.border} !important;
    fill: ${({ theme }) => theme.colors.textSecondary} !important;
    transition: background ${({ theme }) => theme.ease} !important;
    &:hover {
      background: ${({ theme }) => theme.colors.bgElevated} !important;
      fill: ${({ theme }) => theme.colors.textPrimary} !important;
    }
  }

  .react-flow__edge-path { stroke: ${({ theme }) => theme.colors.accent} !important; stroke-opacity: 0.7; }

  /* ── Handles ── */
  .react-flow__handle {
    width: 10px !important;
    height: 10px !important;
    background: ${({ theme }) => theme.colors.bgDeep} !important;
    border: 2px solid ${({ theme }) => theme.colors.accent} !important;
    border-radius: 50% !important;
    transition: background ${({ theme }) => theme.ease}, box-shadow ${({ theme }) => theme.ease};
    &:hover {
      background: ${({ theme }) => theme.colors.accent} !important;
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accentGlow} !important;
    }
  }

  .react-flow__handle-left { left: -5px !important; }
  .react-flow__handle-right { right: -5px !important; }

  /* ── Node selected state ── */
  .react-flow__node.selected .base-node {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accentGlow}, ${({ theme }) => theme.shadows.node};
  }

  /* ── Node field form elements (shared across all nodes) ── */
  .node-field {
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: 100%;

    span {
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: ${({ theme }) => theme.colors.textMuted};
    }

    input, select {
      width: 100%;
      padding: 5px 8px;
      background: ${({ theme }) => theme.colors.bgInput};
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: ${({ theme }) => theme.radii.sm};
      color: ${({ theme }) => theme.colors.textPrimary};
      font-size: 12px;
      font-family: ${({ theme }) => theme.fonts.sans};
      outline: none;
      appearance: none;
      transition: border-color ${({ theme }) => theme.ease}, box-shadow ${({ theme }) => theme.ease};

      &:focus {
        border-color: ${({ theme }) => theme.colors.borderFocus};
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accentDim};
      }
      &::placeholder { color: ${({ theme }) => theme.colors.textMuted}; }
    }
  }

  .node-description {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-style: italic;
  }
`;
