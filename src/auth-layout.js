import React, { createContext, useContext, useMemo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

const AuthLayoutContext = createContext(null);
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

// Authentication spacing responds to viewport height as well as width.
// Keep these overrides scoped so dashboard controls retain their dimensions.
export function AuthLayoutProvider({ children, register }) {
  const { width, height } = useWindowDimensions();
  const layout = useMemo(() => {
    const wide = width >= 880;
    const available = height - (wide ? 0 : 112);
    const density = clamp((available - (register ? 180 : 0)) / 1000, .36, 1.25);
    const type = clamp(available / 850, .86, 1.18);
    const space = value => Math.round(value * density);
    return {
      authPage: { flex: 1, minHeight: 0 },
      story: { paddingHorizontal: clamp(width * .038, 24, 80), paddingVertical: wide ? space(30) : 12 },
      storyBody: { paddingVertical: space(22), minHeight: 0 },
      storyTitle: { fontSize: Math.round(46 * type), lineHeight: Math.round(55 * type), marginTop: space(20) },
      storyDescription: { fontSize: Math.round(18 * type), lineHeight: Math.round(29 * type), marginTop: space(22), maxWidth: 560 },
      art: { height: space(230), marginTop: space(12) },
      orbit: { width: space(205), height: space(205) },
      orbitInner: { width: space(165), height: space(165) },
      shield: { width: space(118), height: space(134) },
      artTag: { padding: space(12), bottom: 0 },
      storyFeature: { fontSize: Math.round(16 * type) },
      storyFeatures: { gap: space(14), marginTop: space(22) },
      authMain: { minHeight: 0, paddingHorizontal: wide ? 32 : 24, paddingVertical: space(18) },
      authForm: { maxWidth: Math.round(440 * type), paddingVertical: 0 },
      authTitle: { fontSize: Math.round(32 * type), marginTop: space(14) },
      description: { fontSize: Math.round(16 * type), lineHeight: Math.round(25 * type), marginTop: space(10), marginBottom: space(22) },
      demoNote: { padding: space(13), marginBottom: space(22) },
      field: { marginBottom: space(14) },
      inputWrap: { marginTop: space(8) },
      input: { minHeight: clamp(space(54), 42, 64) },
      show: { minHeight: 42 },
      button: { minHeight: clamp(space(50), 44, 60), paddingVertical: space(14) },
      divider: { marginVertical: space(14) },
      switchRow: { marginTop: space(12) },
      authFoot: { marginTop: space(16) },
    };
  }, [width, height, register]);
  return <AuthLayoutContext.Provider value={layout}>{children}</AuthLayoutContext.Provider>;
}

export function useAuthStyles(styles) {
  const overrides = useContext(AuthLayoutContext);
  return useMemo(() => overrides ? Object.fromEntries(
    Object.keys({ ...styles, ...overrides }).map(key => [key, StyleSheet.flatten([styles[key], overrides[key]])])
  ) : styles, [styles, overrides]);
}


