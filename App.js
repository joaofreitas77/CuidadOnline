import React, { useState } from 'react';
import { Platform, Pressable, ScrollView, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Feather from '@expo/vector-icons/Feather';
import { lessons, questions } from './src/content';
import { validateForm } from './src/validation';
import { s, C } from './src/styles';

function Icon({ name, size = 20, color = C.blue }) { return <Feather name={name} size={size} color={color}/>; }
function Button({ children, onPress, secondary, style }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed, hovered }) => [s.button, secondary && s.secondary, hovered && { opacity: .88 }, pressed && { transform: [{ scale: .98 }] }, style]}><Text style={[s.buttonText, secondary && { color: C.blue }]}>{children}</Text></Pressable>;
}
function Link({ children, onPress }) { return <Pressable accessibilityRole="button" onPress={onPress} style={s.link}><Text style={s.linkText}>{children}</Text></Pressable>; }
function Brand({ light }) { return <View style={s.row}><View style={[s.logo, light && { backgroundColor: '#FFFFFF25' }]}><Icon name="shield" color="white" size={24}/></View><Text style={[s.brand, light && { color: 'white' }]}>Cuidad<Text style={{ color: light ? '#A9DAFF' : C.blue }}>O</Text><Text style={{ fontWeight: '400' }}>nline</Text></Text></View>; }
function Shield({ hero }) { return <View style={hero ? s.heroArt : s.art}><View style={s.orbit}><View style={s.orbitInner}><View style={s.shield}><Icon name="shield" size={72}/><View style={{ position: 'absolute' }}><Icon name="check" size={30}/></View></View></View></View><View style={s.artTag}><Icon name="check-circle" size={17} color={C.green}/><Text style={{ color: C.green, fontSize: 14, fontWeight: '600' }}>Conhecimento que protege</Text></View></View>; }
function Field({ label, value, onChangeText, password, error, ...props }) {
  const [show, setShow] = useState(false);
  const [focus, setFocus] = useState(false);
  return <View style={s.field}><Text style={s.label}>{label}</Text><View style={[s.inputWrap, focus && { borderColor: C.blue }, error && { borderColor: '#B63D3D' }]}><TextInput accessibilityLabel={label} value={value} onChangeText={onChangeText} placeholderTextColor="#8995A7" secureTextEntry={password && !show} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={s.input} {...props}/>{password && <Pressable accessibilityRole="button" accessibilityLabel={show ? 'Ocultar senha' : 'Mostrar senha'} onPress={() => setShow(!show)} style={s.show}><Icon name={show ? 'eye-off' : 'eye'} size={19} color={C.muted}/></Pressable>}</View>{error && <Text accessibilityLiveRegion="polite" style={s.error}>{error}</Text>}</View>;
}
function Auth({ register, navigate, onEnter }) {
  const { width } = useWindowDimensions();
  const wide = width >= 880;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({});
  function submit() {
    const result = validateForm({ register, name, email, password, confirm });
    setErrors(result);
    if (!Object.keys(result).length) onEnter(register ? name.trim() : 'Visitante');
  }
  return <ScrollView contentContainerStyle={[s.authPage, wide && { flexDirection: 'row' }]} keyboardShouldPersistTaps="handled">
    <View style={[s.story, wide ? { width: '47%' } : { padding: 24 }]}><Brand light/>{wide && <><View style={s.storyBody}><Text style={s.eyebrowLight}>MAIS CONFIANÇA, MENOS RISCOS</Text><Text style={s.storyTitle}>A internet pode ser um lugar mais seguro.</Text><Text style={s.storyDescription}>Aprenda a reconhecer golpes e cuide do que é importante para você. Um passo de cada vez.</Text><Shield/><View style={{ gap: 14, marginTop: 28 }}>{['Explicações sem complicação', 'Aprenda no seu ritmo'].map(text => <View key={text} style={s.row}><Icon name="check-circle" color="#BFE0FF" size={18}/><Text style={s.storyFeature}>{text}</Text></View>)}</View></View><Text style={s.storyFoot}>EDUCAÇÃO DIGITAL PARA TODOS</Text></>}</View>
    <View style={s.authMain}><View style={s.authForm}><Text style={s.kicker}>{register ? 'SEU PRIMEIRO PASSO' : 'BOM TER VOCÊ AQUI'}</Text><Text accessibilityRole="header" style={s.authTitle}>{register ? 'Vamos começar?' : 'Bem-vindo de volta!'}</Text><Text style={s.description}>{register ? 'Crie seu espaço para aprender a se proteger.' : 'Entre para continuar aprendendo a se proteger.'}</Text>
      <View style={s.demoNote}><Text style={s.demoText}>Versão demonstrativa · Use dados fictícios. Nenhuma conta será criada nesta etapa.</Text></View>
      {register && <Field label="Como você se chama?" placeholder="Seu nome" value={name} onChangeText={setName} error={errors.name} autoComplete="name"/>}
      <Field label="E-mail" placeholder="nome@exemplo.com" value={email} onChangeText={setEmail} error={errors.email} autoCapitalize="none" keyboardType="email-address" autoComplete="email"/>
      <Field label="Senha" placeholder="Pelo menos 8 caracteres" value={password} onChangeText={setPassword} password error={errors.password} autoCapitalize="none" autoComplete="off" onSubmitEditing={register ? undefined : submit}/>
      {register && <Field label="Confirme sua senha" placeholder="Digite a senha novamente" value={confirm} onChangeText={setConfirm} password error={errors.confirm} autoCapitalize="none" autoComplete="off" onSubmitEditing={submit}/>}
      <Button onPress={submit}>{register ? 'Experimentar cadastro  →' : 'Entrar na demonstração  →'}</Button>
      <View style={s.divider}><View style={s.rule}/><Text style={s.small}>ou</Text><View style={s.rule}/></View>
      <Button secondary onPress={() => onEnter('Visitante')}>Explorar sem uma conta</Button>
      <View style={s.switchRow}><Text style={s.small}>{register ? 'Já tem uma conta?' : 'Ainda não tem uma conta?'}</Text><Link onPress={() => navigate(register ? 'login' : 'register')}>{register ? 'Entrar' : 'Criar conta'}</Link></View>
      <Text style={s.authFoot}>Um pouco de atenção faz toda a diferença.</Text>
    </View></View>
  </ScrollView>;
}
function Quiz() {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const q = questions[index];
  function reply(value) { if (answer !== null) return; setAnswer(value); if (value === q.scam) setScore(value => value + 1); }
  return <View style={s.quizCard}><View style={s.between}><Text style={s.kicker}>APRENDA NA PRÁTICA</Text><Text style={s.small}>{finished ? 'Concluído' : (index + 1) + ' de ' + questions.length}</Text></View><Text style={s.cardTitle}>{finished ? 'Cada tentativa ensina.' : 'É golpe ou não?'}</Text>{finished ? <><Text style={s.description}>Você acertou {score} de {questions.length} situações. Continue praticando para reconhecer os sinais com mais confiança.</Text><Button onPress={() => { setIndex(0); setAnswer(null); setScore(0); setFinished(false); }}>Praticar novamente</Button></> : <><Text style={s.small}>Imagine que você recebeu esta mensagem:</Text><View style={s.message}><View style={s.row}><View style={s.avatarSmall}><Icon name="user" color={C.muted} size={18}/></View><View style={{ flex: 1 }}><Text style={s.label}>{q.sender}</Text><Text style={s.tiny}>Situação fictícia</Text></View></View><Text style={s.messageText}>{q.message}</Text><Text style={[s.tiny, { textAlign: 'right' }]}>10:42</Text></View>{answer === null ? <View style={s.row}><Button style={{ flex: 1 }} onPress={() => reply(true)}>É golpe</Button><Button style={{ flex: 1 }} secondary onPress={() => reply(false)}>Parece seguro</Button></View> : <View accessibilityLiveRegion="polite"><View style={[s.feedback, { backgroundColor: answer === q.scam ? '#EAF7F0' : '#FFF4E5' }]}><Text style={s.label}>{answer === q.scam ? 'Isso mesmo!' : 'Vamos entender juntos.'}</Text><Text style={s.body}>{q.explanation}</Text></View><Button secondary onPress={() => { if (index + 1 === questions.length) setFinished(true); else setIndex(index + 1); setAnswer(null); }}>{index + 1 === questions.length ? 'Ver resultado' : 'Próxima situação  →'}</Button></View>}</>}</View>;
}
function Dashboard({ user, onExit }) {
  const { width } = useWindowDimensions();
  const wide = width >= 1000;
  const [section, setSection] = useState('home');
  const [lesson, setLesson] = useState(null);
  const [completed, setCompleted] = useState([]);
  const nav = [{ id: 'home', icon: 'home', title: 'Início' }, { id: 'learn', icon: 'book-open', title: 'Aprender' }, { id: 'practice', icon: 'target', title: 'Praticar' }];
  function go(id) { setSection(id); setLesson(null); }
  return <View style={s.app}>
    {wide && <View style={s.sidebar}><Brand/><Text style={[s.tiny, { marginTop: 48, marginBottom: 16, letterSpacing: 2 }]}>SEU ESPAÇO</Text>{nav.map(item => <Pressable key={item.id} accessibilityRole="button" accessibilityState={{ selected: section === item.id }} onPress={() => go(item.id)} style={[s.navItem, section === item.id && s.navActive]}><Icon name={item.icon} color={section === item.id ? C.blue : C.muted}/><Text style={[s.navText, section === item.id && { color: C.blue }]}>{item.title}</Text>{section === item.id && <View style={s.navDot}/>}</Pressable>)}<View style={{ flex: 1 }}/><View style={s.sidebarTip}><Icon name="heart"/><Text style={s.label}>Na dúvida, pare e confira.</Text><Text style={s.small}>Você não precisa decidir com pressa.</Text></View><Link onPress={onExit}>Sair da demonstração</Link></View>}
    <View style={{ flex: 1 }}><View style={[s.topbar, !wide && { paddingHorizontal: 20 }]}>{wide ? <Text style={s.small}>Seu espaço de aprendizagem</Text> : <Brand/>}<View style={s.row}>{width > 450 && <View style={s.badge}><Text style={s.tiny}>Demonstração</Text></View>}{wide && <Text style={s.label}>{user.split(' ')[0]}</Text>}<View style={s.avatar}><Text style={{ color: C.blue, fontWeight: '700' }}>{user[0].toUpperCase()}</Text></View></View></View>
      {!wide && <View style={s.mobileNav}>{nav.map(item => <Link key={item.id} onPress={() => go(item.id)}>{section === item.id ? '● ' : ''}{item.title}</Link>)}<Link onPress={onExit}>Sair</Link></View>}
      <ScrollView contentContainerStyle={[s.dashboard, width < 650 && { padding: 20 }]}>
        <View style={s.content}><Text style={s.kicker}>UM PASSO DE CADA VEZ</Text><Text accessibilityRole="header" style={s.pageTitle}>{section === 'home' ? 'Olá, ' + user.split(' ')[0] + '!' : section === 'learn' ? 'Aprender a se proteger' : 'Vamos praticar?'}</Text><Text style={s.description}>{section === 'home' ? 'Que tal aprender algo novo para navegar com mais segurança?' : section === 'learn' ? 'Escolha um assunto. Aqui, tudo é explicado com calma.' : 'Treine seu olhar em situações do dia a dia. Pode errar: é assim que se aprende.'}</Text>
          {section === 'home' && <><View style={s.hero}><View style={{ flex: 1 }}><View style={s.heroBadge}><Text style={s.heroBadgeText}>SEU CONHECIMENTO É SUA PROTEÇÃO</Text></View><Text style={s.heroTitle}>Mais confiança em cada clique.</Text><Text style={s.heroDescription}>Reconheça os sinais de um golpe antes de compartilhar seus dados ou enviar dinheiro.</Text><Button secondary onPress={() => { go('learn'); setLesson(lessons[0]); }} style={s.heroButton}>Começar a aprender  →</Button></View>{width >= 780 && <Shield hero/>}</View>
          <View style={s.stats}><View style={s.stat}><Text style={s.statNumber}>{completed.length}<Text style={s.statTotal}> / 4</Text></Text><Text style={s.small}>temas concluídos</Text></View><View style={s.stat}><Text style={s.statNumber}>{Math.round(completed.length / 4 * 100)}<Text style={s.statTotal}>%</Text></Text><Text style={s.small}>da sua jornada</Text></View>{width > 650 && <View style={[s.stat, { flex: 1.5 }]}><Text style={s.label}>Cada passo conta</Text><Text style={s.small}>Seu progresso nesta visita</Text><View style={s.track}><View style={[s.fill, { width: completed.length / 4 * 100 + '%' }]}/></View></View>}</View></>}
          {section !== 'practice' && <View style={[s.lower, width < 1200 && { flexDirection: 'column' }]}><View style={{ flex: 1.35 }}><View style={s.sectionHeading}><Text accessibilityRole="header" style={s.sectionTitle}>{lesson ? 'Vamos entender' : 'Conheça os golpes mais comuns'}</Text>{lesson && <Link onPress={() => setLesson(null)}>← Voltar</Link>}</View>{lesson ? <View style={s.lessonDetail}><View style={[s.topicIcon, { backgroundColor: lesson.bg }]}><Icon name={lesson.icon} color={lesson.color}/></View><Text style={s.cardTitle}>{lesson.title}</Text><Text style={s.body}>{lesson.intro}</Text>{lesson.tips.map((tip, i) => <View key={tip} style={[s.row, { alignItems: 'flex-start', marginTop: 20 }]}><Text style={s.step}>{i + 1}</Text><Text style={[s.body, { flex: 1 }]}>{tip}</Text></View>)}<Button style={{ marginTop: 28 }} onPress={() => { setCompleted(previous => previous.includes(lesson.id) ? previous : [...previous, lesson.id]); setLesson(null); }}>Concluir leitura  ✓</Button></View> : <View style={s.lessonGrid}>{lessons.map(item => <Pressable key={item.id} accessibilityRole="button" onPress={() => setLesson(item)} style={({ hovered }) => [s.lessonCard, { width: width < 650 ? '100%' : '48%' }, hovered && { borderColor: '#ABC6FF' }]}><View style={s.between}><View style={[s.topicIcon, { backgroundColor: item.bg }]}><Icon name={item.icon} color={item.color}/></View><Text style={s.tiny}>{completed.includes(item.id) ? '✓ Concluído' : '3 min'}</Text></View><Text style={s.lessonTitle}>{item.title}</Text><Text style={s.small}>{item.summary}</Text><Text style={[s.linkText, { marginTop: 20 }]}>Aprender a identificar  →</Text></Pressable>)}</View>}</View><View style={{ flex: 1 }}><Quiz/></View></View>}
          {section === 'practice' && <View style={{ maxWidth: 720, width: '100%', alignSelf: 'center', marginTop: 28 }}><Quiz/></View>}
          <View style={s.bottomNote}><Text style={s.small}>♡  Aprender a se proteger também é cuidar de quem você ama.</Text><Text style={s.tiny}>CuidadOnline · Educação e segurança digital</Text></View>
        </View>
      </ScrollView>
    </View>
  </View>;
}
export default function App() {
  const [screen, setScreen] = useState('login');
  const [user, setUser] = useState('Visitante');
  return <View style={{ flex: 1, paddingTop: Platform.OS === 'android' ? 30 : Platform.OS === 'ios' ? 54 : 0, backgroundColor: C.bg }}><StatusBar style="dark"/>{screen === 'dashboard' ? <Dashboard user={user} onExit={() => { setUser('Visitante'); setScreen('login'); }}/> : <Auth key={screen} register={screen === 'register'} navigate={setScreen} onEnter={name => { setUser(name); setScreen('dashboard'); }}/>}</View>;
}
