import { useState, useRef } from 'react';
import './App.css';

// ── DATA ──────────────────────────────────────────────────────────────────────
const questoes = [
  { nome:"correta_questao1", enunciado:"Larissa tinha 2 flores em seu jardim e ganhou mais 3 flores de sua amiga. Quantas flores Larissa tem agora em seu jardim?", desenvolvimento_aluno:"2+3=5", resposta_aluno:"5", resposta_correta:"5", status:"correta" },
  { nome:"correta_questao2", enunciado:"Pedro tinha 4 moedas em sua carteira. Ele encontrou mais 5 moedas no chão enquanto caminhava pelo parque. Quantas moedas Pedro tem ao todo agora?", desenvolvimento_aluno:"4+5=9", resposta_aluno:"9", resposta_correta:"9", status:"correta" },
  { nome:"correta_questao3", enunciado:"Carla tem 378 adesivos em sua coleção. Ela decidiu dar 162 adesivos para sua irmã. Quantos adesivos Carla terá em sua coleção depois de dar alguns para sua irmã?", desenvolvimento_aluno:"378-162=216", resposta_aluno:"216", resposta_correta:"216", status:"correta" },
  { nome:"incorreta_questao1", enunciado:"Um ônibus escolar transporta 125 alunos pela manhã e 98 alunos à tarde. Quantos alunos são transportados no total durante o dia?", desenvolvimento_aluno:"125+98=147", resposta_aluno:"147", resposta_correta:"223", status:"incorreta" },
  { nome:"incorreta_questao2", enunciado:"Um vendedor vendeu 195 camisetas na loja A e 320 camisetas na loja B. Quantas camisetas ele vendeu no total?", desenvolvimento_aluno:"195+320=335", resposta_aluno:"335", resposta_correta:"515", status:"incorreta" },
  { nome:"incorreta_questao3", enunciado:"Em uma festa, havia 70 balões pendurados na parede. Após alguns estourarem, restaram 45 balões. Quantos balões estouraram na festa?", desenvolvimento_aluno:"70-45=35", resposta_aluno:"35", resposta_correta:"25", status:"incorreta" },
];

const Q_INCORRETA = [
  { secao:'Contexto Pedagógico', perguntas:[
    { id:'CP1', label:'CP1) Quando este conteúdo foi trabalhado?', opcoes:[{letra:'A',texto:'Nesta semana'},{letra:'B',texto:'De 2 à 4 semanas'},{letra:'C',texto:'Neste semestre (Há mais de um mês)'},{letra:'D',texto:'Em semestres anteriores'}] },
    { id:'CP2', label:'CP2) O quanto este conteúdo foi trabalhado?', opcoes:[{letra:'A',texto:'Foi trabalhado em profundidade, com prática extensiva e aplicação em diferentes contextos'},{letra:'B',texto:'Foi bem trabalhado, com prática relevante'},{letra:'C',texto:'Foi trabalhado de forma superficial, com pouca prática'},{letra:'D',texto:'Foi apenas apresentado teoricamente, sem prática associada'}] },
    { id:'CP3', label:'CP3) Como este conteúdo foi trabalhado em aula?', opcoes:[{letra:'A',texto:'Exposição direta (explicação-lousa)'},{letra:'B',texto:'Resolução de problemas em grupo'},{letra:'C',texto:'Resolução de problemas individualmente'},{letra:'D',texto:'Atividade prática-experimental'}] },
  ]},
  { secao:'Desempenho', perguntas:[
    { id:'DSP1', label:'DSP1) Como é o desempenho geral desse aluno em matemática?', opcoes:[{letra:'A',texto:'Abaixo da média'},{letra:'B',texto:'Na média'},{letra:'C',texto:'Acima da média'}] },
    { id:'DSP2', label:'DSP2) Com que frequência o aluno comete este erro?', opcoes:[{letra:'A',texto:'Foi a primeira vez'},{letra:'B',texto:'Às vezes ou algumas vezes'},{letra:'C',texto:'Quase sempre'}] },
    { id:'DSP3', label:'DSP3) O erro parece ser de:', opcoes:[{letra:'A',texto:'Compreensão do conceito'},{letra:'B',texto:'Distração'},{letra:'C',texto:'Interpretação do enunciado'},{letra:'D',texto:'Cálculo-execução'}] },
  ]},
  { secao:'Perfil emocional estável', perguntas:[
    { id:'PEE1', label:'PEE1) Como esse aluno costuma reagir quando erra?', opcoes:[{letra:'A',texto:'Fica frustrado'},{letra:'B',texto:'Fica indiferente'},{letra:'C',texto:'Quer entender o erro'},{letra:'D',texto:'Fica ansioso'},{letra:'E',texto:'Varia muito'}] },
    { id:'PEE2', label:'PEE2) Como é a relação desse aluno com matemática?', opcoes:[{letra:'A',texto:'Demonstra confiança'},{letra:'B',texto:'Demonstra interesse'},{letra:'C',texto:'Demonstra desinteresse'},{letra:'D',texto:'Demonstra resistência'},{letra:'E',texto:'Demonstra ansiedade ou bloqueio'}] },
    { id:'PEE3', label:'PEE3) Como esse aluno recebe o feedback do professor?', opcoes:[{letra:'A',texto:'Recebe bem'},{letra:'B',texto:'Depende de como é dado'},{letra:'C',texto:'Tende a resistir'}] },
  ]},
];

const Q_CORRETA = [
  { secao:'Contexto Pedagógico', perguntas:[
    { id:'CP1', label:'CP1) Quando este conteúdo foi trabalhado?', opcoes:[{letra:'A',texto:'Nesta semana'},{letra:'B',texto:'De 2 à 4 semanas'},{letra:'C',texto:'Neste semestre (Há mais de um mês)'},{letra:'D',texto:'Em semestres anteriores'}] },
    { id:'CP2', label:'CP2) O quanto este conteúdo foi trabalhado?', opcoes:[{letra:'A',texto:'Foi trabalhado em profundidade, com prática extensiva e aplicação em diferentes contextos'},{letra:'B',texto:'Foi bem trabalhado, com prática relevante'},{letra:'C',texto:'Foi trabalhado de forma superficial, com pouca prática'},{letra:'D',texto:'Foi apenas apresentado teoricamente, sem prática associada'}] },
    { id:'CP3', label:'CP3) Como este conteúdo foi trabalhado em aula?', opcoes:[{letra:'A',texto:'Exposição direta (explicação-lousa)'},{letra:'B',texto:'Resolução de problemas em grupo'},{letra:'C',texto:'Resolução de problemas individualmente'},{letra:'D',texto:'Atividade prática-experimental'}] },
  ]},
  { secao:'Desempenho', perguntas:[
    { id:'DSP1', label:'DSP1) O acerto foi esperado para esse aluno?', opcoes:[{letra:'A',texto:'Sim, é o esperado para ele'},{letra:'B',texto:'Sim, mas ele costuma ter dificuldade'},{letra:'C',texto:'Não, foi uma surpresa positiva'}] },
  ]},
  { secao:'Perfil emocional estável', perguntas:[
    { id:'PEE1', label:'PEE1) Como esse aluno costuma reagir quando erra?', opcoes:[{letra:'A',texto:'Fica frustrado'},{letra:'B',texto:'Fica indiferente'},{letra:'C',texto:'Quer entender o erro'},{letra:'D',texto:'Fica ansioso'},{letra:'E',texto:'Varia muito'}] },
    { id:'PEE2', label:'PEE2) Como é a relação desse aluno com matemática?', opcoes:[{letra:'A',texto:'Demonstra confiança'},{letra:'B',texto:'Demonstra interesse'},{letra:'C',texto:'Demonstra desinteresse'},{letra:'D',texto:'Demonstra resistência'},{letra:'E',texto:'Demonstra bloqueio ou ansiedade'}] },
    { id:'PEE3', label:'PEE3) Como esse aluno recebe o feedback do professor?', opcoes:[{letra:'A',texto:'Recebe bem'},{letra:'B',texto:'Depende de como é dado'},{letra:'C',texto:'Tende a resistir'}] },
  ]},
];

const MAP = {
  CP1:{ A:'nesta semana', B:'de 2 a 4 semanas atrás', C:'neste semestre, há mais de um mês', D:'em semestres anteriores' },
  CP2:{ A:'foi trabalhado em profundidade, com prática extensiva e aplicação em diferentes contextos', B:'foi bem trabalhado, com prática relevante', C:'foi trabalhado de forma superficial, com pouca prática', D:'foi apenas apresentado teoricamente, sem prática associada' },
  CP3:{ A:'exposição direta com explicação/lousa', B:'resolução de problemas em grupo', C:'resolução de problemas individualmente', D:'atividade prática/experimental' },
  DSP1_incorreta:{ A:'Abaixo da média', B:'Na média', C:'Acima da média' },
  DSP2:{ A:'apareceu pela primeira vez', B:'acontece às vezes ou algumas vezes', C:'acontece quase sempre' },
  DSP3:{ A:'compreensão do conceito', B:'distração', C:'interpretação do enunciado', D:'cálculo/execução' },
  DSP1_correta:{ A:'era esperado', B:'era esperado, mas o aluno costuma ter dificuldade nesse conteúdo', C:'foi uma surpresa positiva' },
  PEE1:{ A:'fica frustrado', B:'fica indiferente', C:'quer entender o erro', D:'fica ansioso', E:'varia muito' },
  PEE2_incorreta:{ A:'demonstra confiança', B:'demonstra interesse', C:'demonstra desinteresse', D:'demonstra resistência', E:'demonstra ansiedade ou bloqueio' },
  PEE2_correta:{ A:'demonstra confiança', B:'demonstra interesse', C:'demonstra desinteresse', D:'demonstra resistência', E:'demonstra bloqueio ou ansiedade' },
  PEE3:{ A:'recebe bem', B:'depende de como é dado', C:'tende a resistir' },
};

const DEFAULT_TEXTS = {
  incorreta: {
    comeco:`Crie um feedback em linguagem acessível, acolhedora e adequada para crianças dos anos iniciais do Ensino Fundamental.\n\nO aluno não chegou à resposta correta. Sua tarefa é produzir um feedback que reconheça o esforço, oriente passo a passo, sem constranger, punir ou entregar diretamente a resposta correta e encoraje o aluno, provocando uma reflexão sobre o erro.`,
    final:`## Estrutura obrigatória do feedback\n\nO feedback deve seguir esta estrutura:\n\n1. Reconhecimento inicial do esforço ou da tentativa do aluno.\n2. Orientação passo a passo sobre onde o raciocínio pode ter se desviado.\n3. Encorajamento, provocação de reflexão sobre o erro e orientação clara para o próximo passo.\n\n## Regras de escrita\n\n* Use linguagem simples, respeitosa e encorajadora.\n* Escreva diretamente para o aluno.\n* Não use tom excessivamente infantilizado.\n* Não invente informações sobre o aluno, a turma ou a aula.\n* Use apenas os dados fornecidos.\n* Trate o tipo de erro como uma hipótese pedagógica, não como uma certeza absoluta.\n* Adapte o tom ao perfil emocional informado pelo professor.\n* Não revele explicitamente a resposta correta.\n* Não resolva toda a questão pelo aluno.\n* Não use frases como "você errou feio", "você não entendeu" ou qualquer formulação punitiva.\n* Ajude o aluno a revisar o caminho, perceber o ponto de atenção e tentar novamente.\n* O feedback deve ter no máximo 10 linhas.\n* Não use markdown no texto do feedback.\n* Não use listas numeradas no texto do feedback.\n\n## Formato de saída obrigatório\n\nRetorne apenas um JSON válido, sem markdown, no seguinte formato:\n\n{\n  "feedback_aluno": ""\n}\n\nNo campo "feedback_aluno", escreva o feedback direcionado ao aluno.`,
  },
  correta: {
    comeco:`Crie um feedback em linguagem acessível, acolhedora e adequada para crianças dos anos iniciais do Ensino Fundamental.\n\nO aluno acertou a resposta. Sua tarefa é produzir um feedback que valorize o acerto, reconheça o progresso e ajude o aluno a continuar avançando, sem apenas parabenizar de forma genérica.`,
    final:`## Estrutura obrigatória do feedback\n\nO feedback deve seguir esta estrutura:\n\n1. Reconhecimento inicial do acerto.\n2. Menção específica ao que o aluno demonstrou compreender ou fazer bem.\n3. Reconhecimento do esforço, aprofundamento do conceito, generalização para novos contextos e um pequeno desafio para continuar avançando.\n\n## Regras de escrita\n\n* Use linguagem simples, respeitosa e encorajadora.\n* Escreva diretamente para o aluno.\n* Não use tom excessivamente infantilizado.\n* Não invente informações sobre o aluno, a turma ou a aula.\n* Use apenas os dados fornecidos.\n* Adapte o tom ao perfil emocional informado pelo professor.\n* Não revele explicitamente a resposta correta.\n* Não diga apenas "parabéns"; explique o motivo do acerto.\n* O feedback deve ter no máximo 10 linhas.\n* Não use markdown no texto do feedback.\n* Não use listas numeradas no texto do feedback.\n\n## Formato de saída obrigatório\n\nRetorne apenas um JSON válido, sem markdown, no seguinte formato:\n\n{\n  "feedback_aluno": ""\n}\n\nNo campo "feedback_aluno", escreva o feedback direcionado ao aluno.`,
  },
};

// ── HELPERS ───────────────────────────────────────────────────────────────────
function slugify(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9\s_]/g,'').trim().replace(/\s+/g,'_').toUpperCase();
}

function buildId(questao, respostas, rotulo) {
  if (!questao) return '';
  const st = questao.status;
  let id = questao.nome;
  id += `_CP1${respostas.CP1||''}2${respostas.CP2||''}3${respostas.CP3||''}`;
  if (st === 'incorreta') id += `_DSP1${respostas.DSP1||''}2${respostas.DSP2||''}3${respostas.DSP3||''}`;
  else id += `_DSP1${respostas.DSP1||''}`;
  id += `_PEE1${respostas.PEE1||''}2${respostas.PEE2||''}3${respostas.PEE3||''}`;
  if (rotulo?.trim()) id += `_${slugify(rotulo.trim())}`;
  return id;
}

function buildCodigoLive(questao, respostas) {
  if (!questao) return '';
  const cp = `CP1${respostas.CP1||'_'}2${respostas.CP2||'_'}3${respostas.CP3||'_'}`;
  const pee = `PEE1${respostas.PEE1||'_'}2${respostas.PEE2||'_'}3${respostas.PEE3||'_'}`;
  if (questao.status === 'incorreta')
    return `${cp}_DSP1${respostas.DSP1||'_'}2${respostas.DSP2||'_'}3${respostas.DSP3||'_'}_${pee}`;
  return `${cp}_DSP1${respostas.DSP1||'_'}_${pee}`;
}

// Parse um código colado e devolve respostas ou null se inválido
function parseCodigo(codigo, status) {
  const s = codigo.trim().toUpperCase();
  const result = {};
  // CP1X2Y3Z
  const cp = s.match(/CP1([A-D])2([A-D])3([A-D])/);
  if (!cp) return null;
  result.CP1 = cp[1]; result.CP2 = cp[2]; result.CP3 = cp[3];
  if (status === 'incorreta') {
    const dsp = s.match(/DSP1([A-C])2([A-C])3([A-D])/);
    if (!dsp) return null;
    result.DSP1 = dsp[1]; result.DSP2 = dsp[2]; result.DSP3 = dsp[3];
  } else {
    const dsp = s.match(/DSP1([A-C])/);
    if (!dsp) return null;
    result.DSP1 = dsp[1];
  }
  const pee = s.match(/PEE1([A-E])2([A-E])3([A-C])/);
  if (!pee) return null;
  result.PEE1 = pee[1]; result.PEE2 = pee[2]; result.PEE3 = pee[3];
  return result;
}

function buildContexto(questao, respostas, obs) {
  const st = questao.status;
  const cp1 = MAP.CP1[respostas.CP1]||'';
  const cp2 = MAP.CP2[respostas.CP2]||'';
  const cp3 = MAP.CP3[respostas.CP3]||'';
  const pee1 = MAP.PEE1[respostas.PEE1]||'';
  const pee2 = MAP[`PEE2_${st}`][respostas.PEE2]||'';
  const pee3 = MAP.PEE3[respostas.PEE3]||'';
  const obsText = obs?.trim() || 'Não informado.';
  if (st === 'incorreta') {
    return `Este conteúdo foi trabalhado ${cp1}. Em relação à profundidade, ${cp2}. Em aula, foi trabalhado por meio de ${cp3}.\n\nDesempenho geral em matemática:\n${MAP.DSP1_incorreta[respostas.DSP1]||''}\n\nEste tipo de erro ${MAP.DSP2[respostas.DSP2]||''}.\n\nO erro parece ser de ${MAP.DSP3[respostas.DSP3]||''}.\n\nPerfil emocional: esse aluno ${pee1} quando erra; ${pee2} em relação à matemática; e ${pee3} ao feedback.\n\nInformação adicional do professor, se houver:\n${obsText}`;
  }
  return `Este conteúdo foi trabalhado ${cp1}. Em relação à profundidade, ${cp2}. Em aula, foi trabalhado por meio de ${cp3}.\n\nO acerto ${MAP.DSP1_correta[respostas.DSP1]||''}.\n\nPerfil emocional: esse aluno ${pee1} quando erra; ${pee2} em relação à matemática; e ${pee3} ao feedback.\n\nInformação adicional do professor, se houver:\n${obsText}`;
}

function buildDadosQuestao(q) {
  return `## Dados da questão\n\nEnunciado da questão:\n${q.enunciado}\n\nDesenvolvimento do aluno:\n${q.desenvolvimento_aluno}\n\nResposta final do aluno:\n${q.resposta_aluno}\n\nResposta correta esperada:\n${q.resposta_correta}\n\nObservação importante: a resposta correta esperada é uma informação interna para orientar sua análise. Não revele explicitamente a resposta correta no feedback.`;
}

function buildPromptFinal(comeco, dadosQuestao, contexto, finalText) {
  return `${comeco}\n\n${dadosQuestao}\n\n## Contexto do aluno\n\n${contexto}\n\n${finalText}`;
}

// Renderiza o prompt colorido por seção
function PromptColorido({ texto, comeco, dadosQuestao, contexto, finalText }) {
  if (!texto) return null;
  // Divide pelas seções conhecidas para colorir
  const partes = [
    { key:'comeco', label:'Início', value: comeco, cls:'prompt-part-comeco' },
    { key:'dados', label:'Dados da questão', value: dadosQuestao, cls:'prompt-part-dados' },
    { key:'contexto', label:'Contexto do aluno', value: contexto, cls:'prompt-part-contexto' },
    { key:'final', label:'Final', value: finalText, cls:'prompt-part-final' },
  ];
  return (
    <div className="prompt-colorido">
      {partes.map(p => (
        <div key={p.key} className={`prompt-part ${p.cls}`}>
          <span className="prompt-part-tag">{p.label}</span>
          <pre className="prompt-part-text">{p.key === 'contexto' ? `## Contexto do aluno\n\n${p.value}` : p.value}</pre>
        </div>
      ))}
    </div>
  );
}

function getRequiredIds(status) {
  if (status === 'incorreta') return ['CP1','CP2','CP3','DSP1','DSP2','DSP3','PEE1','PEE2','PEE3'];
  return ['CP1','CP2','CP3','DSP1','PEE1','PEE2','PEE3'];
}

function loadHistory() {
  try {
    const saved = JSON.parse(localStorage.getItem('sti_history') || '[]');
    return Array.isArray(saved) ? saved.map(item => ({ ...item, schema_version:item.schema_version ?? 1 })) : [];
  } catch { return []; }
}
function saveHistory(h) { localStorage.setItem('sti_history', JSON.stringify(h)); }

function downloadJson(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type:'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 0);
}

function isImportavel(item) {
  return Boolean(item && typeof item === 'object' && item.id && (item.prompt_final || item.contexto_aluno_gerado || item.questao));
}

function idSemConflito(id, idsUsados) {
  if (!idsUsados.has(id)) return id;
  let numero = 1;
  while (idsUsados.has(`${id}_DUPLICADO_${numero}`)) numero += 1;
  return `${id}_DUPLICADO_${numero}`;
}

function idCopiaSemConflito(id, idsUsados) {
  if (!idsUsados.has(id)) return id;
  let numero = 1;
  while (idsUsados.has(`${id}_COPIA_${numero}`)) numero += 1;
  return `${id}_COPIA_${numero}`;
}

// ── MODAL ─────────────────────────────────────────────────────────────────────
function Modal({ onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [questaoSel, setQuestaoSel] = useState(null);
  const [respostas, setRespostas] = useState({});
  const [obs, setObs] = useState('');
  const [comeco, setComeco] = useState('');
  const [finalText, setFinalText] = useState('');
  const [promptFinal, setPromptFinal] = useState('');
  const [dadosQuestaoStr, setDadosQuestaoStr] = useState('');
  const [contextoStr, setContextoStr] = useState('');
  const [respostaIA, setRespostaIA] = useState('');
  const [rotulo, setRotulo] = useState('');
  const [history, setHistory] = useState(loadHistory);
  const [errors, setErrors] = useState([]);
  const [saveWarn, setSaveWarn] = useState('');
  const [toast, setToast] = useState('');
  const [viewItem, setViewItem] = useState(null);
  const [activeTab, setActiveTab] = useState('form');
  const [codigoInput, setCodigoInput] = useState('');
  const [codigoErr, setCodigoErr] = useState('');
  const [showPromptRaw, setShowPromptRaw] = useState(false);
  const [loadedFromHistory, setLoadedFromHistory] = useState(false);
  const [loadedHistoryTestId, setLoadedHistoryTestId] = useState(null);
  // Modals
  const [modalExportarPos, setModalExportarPos] = useState(false); // após salvar
  const [modalExportarHist, setModalExportarHist] = useState(false); // histórico
  const [selecionados, setSelecionados] = useState([]); // ids selecionados no modal de exportar
  const importRef = useRef();

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(''), 2200); };

  const handleSelectQuestao = (q) => {
    setQuestaoSel(q); setRespostas({}); setObs(''); setPromptFinal('');
    setDadosQuestaoStr(''); setContextoStr('');
    setRespostaIA(''); setRotulo(''); setErrors([]); setSaveWarn('');
    setCodigoInput(''); setCodigoErr('');
    setComeco(DEFAULT_TEXTS[q.status].comeco);
    setFinalText(DEFAULT_TEXTS[q.status].final);
    setLoadedFromHistory(false); setLoadedHistoryTestId(null);
  };

  const loadTestIntoBuilder = (teste) => {
    const questaoSalva = teste.questao && typeof teste.questao === 'object' ? teste.questao : {};
    const nomePeloId = String(teste.id || '').match(/^(.*?)_CP/)?.[1] || '';
    const nomeQuestao = questaoSalva.nome || teste.nome_questao || nomePeloId;
    const questaoAtual = questoes.find(q => q.nome === nomeQuestao);
    const statusSugerido = teste.status || questaoSalva.status || questaoAtual?.status || (nomeQuestao.startsWith('incorreta_') ? 'incorreta' : 'correta');
    const status = statusSugerido === 'incorreta' ? 'incorreta' : 'correta';
    const questaoCarregada = questaoAtual || {
      enunciado: '',
      desenvolvimento_aluno: '',
      resposta_aluno: '',
      resposta_correta: '',
      ...questaoSalva,
      nome: nomeQuestao || 'questao_importada',
      status,
    };
    const respostasSalvas = teste.respostas_questionario && typeof teste.respostas_questionario === 'object'
      ? { ...teste.respostas_questionario }
      : {};
    const promptSalvo = typeof teste.prompt_final === 'string' ? teste.prompt_final : '';

    setQuestaoSel(questaoCarregada);
    setRespostas(respostasSalvas);
    setObs(String(teste.observacao_professor || '').slice(0, 300));
    setRotulo(String(teste.rotulo_curto || '').slice(0, 25));
    setComeco(typeof teste.comeco_prompt === 'string' ? teste.comeco_prompt : DEFAULT_TEXTS[status].comeco);
    setFinalText(typeof teste.final_prompt === 'string' ? teste.final_prompt : DEFAULT_TEXTS[status].final);
    setContextoStr(typeof teste.contexto_aluno_gerado === 'string' ? teste.contexto_aluno_gerado : '');
    setDadosQuestaoStr(buildDadosQuestao(questaoCarregada));
    setPromptFinal(promptSalvo);
    setRespostaIA(typeof teste.resposta_ia === 'string' ? teste.resposta_ia : '');
    setCodigoInput(buildCodigoLive(questaoCarregada, respostasSalvas));
    setCodigoErr(''); setErrors([]); setSaveWarn('');
    setShowPromptRaw(Boolean(promptSalvo));
    setLoadedFromHistory(true); setLoadedHistoryTestId(String(teste.id));
    setActiveTab('form'); setViewItem(null);
    window.scrollTo({ top:0, behavior:'smooth' });
  };

  const handleResposta = (id, letra) => {
    setRespostas(prev => ({ ...prev, [id]: letra }));
    setErrors(prev => prev.filter(e => e !== id));
    // sync código
    setCodigoInput(buildCodigoLive(questaoSel, { ...respostas, [id]: letra }));
  };

  const handleCodigoChange = (val) => {
    setCodigoInput(val);
    if (!val.trim()) { setCodigoErr(''); return; }
    const parsed = parseCodigo(val, questaoSel?.status);
    if (!parsed) { setCodigoErr('Código inválido ou incompleto'); return; }
    setCodigoErr('');
    setRespostas(parsed);
    setErrors([]);
  };

  const handleRestaurar = () => {
    if (!questaoSel) return;
    setComeco(DEFAULT_TEXTS[questaoSel.status].comeco);
    setFinalText(DEFAULT_TEXTS[questaoSel.status].final);
  };

  const handleGerar = () => {
    if (!questaoSel) { setErrors(['__questao__']); return; }
    const required = getRequiredIds(questaoSel.status);
    const missing = required.filter(id => !respostas[id]);
    if (missing.length > 0) { setErrors(missing); return; }
    setErrors([]);
    const contexto = buildContexto(questaoSel, respostas, obs);
    const dados = buildDadosQuestao(questaoSel);
    const prompt = buildPromptFinal(comeco, dados, contexto, finalText);
    setContextoStr(contexto);
    setDadosQuestaoStr(dados);
    setPromptFinal(prompt);
  };

  const handleCopiarPrompt = () => {
    navigator.clipboard.writeText(promptFinal).then(() => showToast('Prompt copiado!'));
  };

  const handleRecomecar = () => {
    setQuestaoSel(null);
    setRespostas({});
    setObs('');
    setComeco('');
    setFinalText('');
    setPromptFinal('');
    setDadosQuestaoStr('');
    setContextoStr('');
    setRespostaIA('');
    setRotulo('');
    setErrors([]);
    setSaveWarn('');
    setCodigoInput('');
    setCodigoErr('');
    setShowPromptRaw(false);
    setModalExportarPos(false);
    setLoadedFromHistory(false);
    setLoadedHistoryTestId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Pronto para um novo teste!');
  };

  const getIdParaSalvar = (idBase) => {
    if (!loadedFromHistory) return idBase;
    const idsOcupados = new Set(history.map(item => item.id));
    if (loadedHistoryTestId) idsOcupados.add(loadedHistoryTestId);
    return idCopiaSemConflito(idBase, idsOcupados);
  };

  const handleSalvar = () => {
    if (!promptFinal) { setSaveWarn('Gere o prompt antes de salvar.'); return; }
    if (obs.length > 300) { setSaveWarn('A observação deve ter no máximo 300 caracteres.'); return; }
    setSaveWarn('');
    const warnIA = !respostaIA.trim();
    const idBase = buildId(questaoSel, respostas, rotulo);
    const id = getIdParaSalvar(idBase);
    const contexto = buildContexto(questaoSel, respostas, obs);
    const registro = {
      id, schema_version:2, questionario_version:'2026-06-novo-questionario', criado_em: new Date().toISOString(),
      questao: questaoSel, status: questaoSel.status,
      respostas_questionario: { ...respostas },
      observacao_professor: obs, rotulo_curto: rotulo,
      codigo_questionario: buildCodigoLive(questaoSel, respostas),
      contexto_aluno_gerado: contexto,
      comeco_prompt: comeco, final_prompt: finalText,
      prompt_final: promptFinal, resposta_ia: respostaIA,
    };
    const newH = [registro, ...history];
    setHistory(newH); saveHistory(newH);
    if (warnIA) setSaveWarn('Aviso: a resposta da IA não foi preenchida.');
    setModalExportarPos(registro); // abre modal perguntando se quer exportar
  };

  const handleExcluir = (id) => {
    const newH = history.filter(h => h.id !== id);
    setHistory(newH); saveHistory(newH);
    if (viewItem?.id === id) setViewItem(null);
  };

  const handleImportar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        const arr = Array.isArray(data) ? data : Array.isArray(data?.tests) ? data.tests : [data];
        setHistory(prev => {
          const idsUsados = new Set(prev.map(h => h.id));
          let ignorados = 0;
          const novos = [];
          arr.forEach(item => {
            if (!isImportavel(item)) { ignorados += 1; return; }
            const id = idSemConflito(String(item.id), idsUsados);
            idsUsados.add(id);
            novos.push({ ...item, id, schema_version:item.schema_version ?? 1 });
          });
          const merged = [...novos, ...prev];
          saveHistory(merged);
          showToast(`${novos.length} importado(s), ${ignorados} ignorado(s).`);
          return merged;
        });
      } catch { showToast('Arquivo inválido.'); }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const openModalExportarHist = () => {
    setSelecionados(history.map(h => h.id));
    setModalExportarHist(true);
  };

  const handleExportarSelecionados = () => {
    const dados = history.filter(h => selecionados.includes(h.id));
    downloadJson(dados, 'sti_testes.json');
    setModalExportarHist(false);
    showToast(`${dados.length} teste(s) exportado(s)!`);
  };

  const toggleSelecionado = (id) => {
    setSelecionados(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  };

  const questoesCorretas = questoes.filter(q=>q.status==='correta');
  const questoesIncorretas = questoes.filter(q=>q.status==='incorreta');
  const questionario = questaoSel?.status === 'incorreta' ? Q_INCORRETA : Q_CORRETA;

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <span className="header-label">PROMPT MAKER</span>
            <span className="header-title">STI</span>
          </div>
          <div className="header-tabs">
            <button className={`tab-btn ${activeTab==='form'?'active':''}`} onClick={()=>setActiveTab('form')}>Novo teste</button>
            <button className={`tab-btn ${activeTab==='history'?'active':''}`} onClick={()=>setActiveTab('history')}>
              Histórico {history.length > 0 && <span className="badge">{history.length}</span>}
            </button>
          </div>
        </div>
      </header>

      {toast && <div className="toast">{toast}</div>}

      {/* ── MODAL: EXPORTAR APÓS SALVAR ── */}
      {modalExportarPos && (
        <Modal onClose={()=>setModalExportarPos(null)}>
          <div className="modal-title">✓ Teste salvo!</div>
          <p className="modal-body">Deseja exportar este teste como arquivo JSON agora?</p>
          <code className="modal-id">{modalExportarPos.id}</code>
          <div className="modal-actions">
            <button className="btn btn-accent" onClick={()=>{ downloadJson([modalExportarPos], `${modalExportarPos.id}.json`); setModalExportarPos(null); showToast('JSON exportado!'); }}>
              Baixar JSON
            </button>
            <button className="btn btn-ghost" onClick={()=>setModalExportarPos(null)}>Agora não</button>
          </div>
        </Modal>
      )}

      {/* ── MODAL: EXPORTAR HISTÓRICO ── */}
      {modalExportarHist && (
        <Modal onClose={()=>setModalExportarHist(false)}>
          <div className="modal-title">Exportar testes</div>
          <p className="modal-body">Selecione quais testes exportar:</p>
          <div className="modal-select-actions">
            <button className="btn btn-ghost btn-xs" onClick={()=>setSelecionados(history.map(h=>h.id))}>Todos</button>
            <button className="btn btn-ghost btn-xs" onClick={()=>setSelecionados([])}>Nenhum</button>
          </div>
          <div className="modal-lista">
            {history.map(item => (
              <label key={item.id} className={`modal-item ${selecionados.includes(item.id)?'checked':''}`}>
                <input type="checkbox" checked={selecionados.includes(item.id)} onChange={()=>toggleSelecionado(item.id)} />
                <div className="modal-item-info">
                  <code className="modal-item-id">{item.id}</code>
                  <span className="modal-item-date">{new Date(item.criado_em).toLocaleString('pt-BR')}</span>
                </div>
                <span className={`hist-badge ${item.status}`}>{item.status}</span>
              </label>
            ))}
          </div>
          <div className="modal-actions">
            <button className="btn btn-accent" disabled={selecionados.length===0} onClick={handleExportarSelecionados}>
              Exportar {selecionados.length > 0 ? `(${selecionados.length})` : ''}
            </button>
            <button className="btn btn-ghost" onClick={()=>setModalExportarHist(false)}>Cancelar</button>
          </div>
        </Modal>
      )}

      {/* ── ABA: NOVO TESTE ── */}
      {activeTab === 'form' && (
        <main className="main-content">

          {loadedFromHistory && (
            <section className="loaded-history-banner">
              <div>
                <strong>Teste carregado do histórico</strong>
                <p>Você está visualizando um teste salvo do histórico. Alterações feitas aqui não modificam o registro original até que você salve novamente.</p>
                <code>Teste carregado: {loadedHistoryTestId}</code>
                {(history.find(item => item.id === loadedHistoryTestId)?.schema_version ?? 1) === 1 && (
                  <p className="loaded-history-legacy">Este teste usa uma versão antiga do questionário. Algumas respostas podem não preencher os campos atuais.</p>
                )}
              </div>
              <button className="btn btn-ghost btn-sm" onClick={handleRecomecar}>Limpar e começar novo teste</button>
            </section>
          )}

          {/* BLOCO 1 */}
          <section className="block block-selecao">
            <h2 className="block-title">1. Seleção da questão</h2>
            <div className="questoes-grupos">
              <div className="questoes-grupo">
                <div className="grupo-label correta">✓ Questões corretas</div>
                <div className="questoes-list">
                  {questoesCorretas.map(q=>(
                    <button key={q.nome} className={`questao-btn correta ${questaoSel?.nome===q.nome?'selected':''}`} onClick={()=>handleSelectQuestao(q)}>
                      <span className="questao-nome">{q.nome}</span>
                      <span className="questao-preview">{q.enunciado.slice(0,60)}…</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="questoes-grupo">
                <div className="grupo-label incorreta">✗ Questões incorretas</div>
                <div className="questoes-list">
                  {questoesIncorretas.map(q=>(
                    <button key={q.nome} className={`questao-btn incorreta ${questaoSel?.nome===q.nome?'selected':''}`} onClick={()=>handleSelectQuestao(q)}>
                      <span className="questao-nome">{q.nome}</span>
                      <span className="questao-preview">{q.enunciado.slice(0,60)}…</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {errors.includes('__questao__') && <p className="err">Selecione uma questão.</p>}
          </section>

          {/* BLOCO 2 */}
          {questaoSel && (
            <section className="block block-dados">
              <h2 className="block-title">2. Dados da questão</h2>
              <div className={`questao-card ${questaoSel.status}`}>
                <div className="questao-status-badge">{questaoSel.status==='correta'?'✓ Correta':'✗ Incorreta'}</div>
                <div className="questao-field"><span className="field-label">Nome</span><span>{questaoSel.nome}</span></div>
                <div className="questao-field"><span className="field-label">Enunciado</span><span>{questaoSel.enunciado}</span></div>
                <div className="questao-row">
                  <div className="questao-field"><span className="field-label">Desenvolvimento</span><span className="mono">{questaoSel.desenvolvimento_aluno}</span></div>
                  <div className="questao-field"><span className="field-label">Resp. aluno</span><span className="mono">{questaoSel.resposta_aluno}</span></div>
                  <div className="questao-field"><span className="field-label">Resp. correta</span><span className="mono">{questaoSel.resposta_correta}</span></div>
                </div>
              </div>
            </section>
          )}

          {/* BLOCO 3 */}
          {questaoSel && (
            <section className="block block-questionario">
              <div className="block-title-row">
                <h2 className="block-title">3. Questionário pedagógico</h2>
              </div>
              {/* Campo de código — editar e colar */}
              <div className="codigo-field-wrap">
                <label className="field-label-block">Código das respostas <span className="opcional">(edite aqui ou cole um código para preencher o questionário)</span></label>
                <input
                  type="text"
                  className={`input codigo-input ${codigoErr?'input-err':''}`}
                  placeholder={questaoSel.status==='incorreta' ? 'ex: CP1B2C3A_DSP1A2C3D_PEE1D2E3B' : 'ex: CP1A2B3D_DSP1C_PEE1A2E3B'}
                  value={codigoInput}
                  onChange={e=>handleCodigoChange(e.target.value)}
                />
                {codigoErr && <p className="err">{codigoErr}</p>}
              </div>

              {questionario.map(secao=>(
                <div key={secao.secao} className="q-secao">
                  <h3 className="q-secao-title">{secao.secao}</h3>
                  {secao.perguntas.map(p=>(
                    <div key={p.id} className={`q-pergunta ${errors.includes(p.id)?'has-error':''}`}>
                      <p className="q-label">{p.label} <span className="req">*</span></p>
                      <div className="q-opcoes">
                        {p.opcoes.map(o=>(
                          <label key={o.letra} className={`q-opcao ${respostas[p.id]===o.letra?'checked':''}`}>
                            <input type="radio" name={p.id} value={o.letra} checked={respostas[p.id]===o.letra} onChange={()=>handleResposta(p.id,o.letra)} />
                            <span className="letra-badge">{o.letra}</span>
                            <span>{o.texto}</span>
                          </label>
                        ))}
                      </div>
                      {errors.includes(p.id) && <p className="err">Campo obrigatório</p>}
                    </div>
                  ))}
                </div>
              ))}

              <div className="q-secao">
                <h3 className="q-secao-title">Intenção do professor</h3>
                <div className="q-pergunta">
                  <p className="q-label">IP1) Tem algo importante sobre esse aluno que devo considerar? <span className="opcional">(opcional)</span></p>
                  <textarea className="textarea" placeholder="Digite aqui" maxLength={300} value={obs} onChange={e=>setObs(e.target.value)} rows={3} />
                  <p className="field-help">Campo opcional. Escreva no máximo 1 ou 2 frases. {obs.length}/300</p>
                </div>
              </div>
            </section>
          )}

          {/* BLOCO 4 */}
          {questaoSel && (
            <section className="block block-textos">
              <div className="block-title-row">
                <h2 className="block-title">4. Começo e final do prompt</h2>
                <button className="btn btn-ghost btn-sm" onClick={handleRestaurar}>↺ Restaurar padrão</button>
              </div>
              <div className="stacked-fields">
                <div className="stacked-field">
                  <label className="field-label-block field-comeco">Começo do prompt</label>
                  <textarea className="textarea mono" value={comeco} onChange={e=>setComeco(e.target.value)} rows={6} />
                </div>
                <div className="stacked-field">
                  <label className="field-label-block field-final">Final do prompt</label>
                  <textarea className="textarea mono" value={finalText} onChange={e=>setFinalText(e.target.value)} rows={20} />
                </div>
              </div>
            </section>
          )}

          {/* BLOCO 5 */}
          {questaoSel && (
            <section className="block block-prompt">
              <div className="block-title-row">
                <h2 className="block-title">5. Prompt final</h2>
                <div style={{display:'flex',gap:8,alignItems:'center'}}>
                  {promptFinal && (
                    <>
                      <button className={`btn btn-ghost btn-sm ${!showPromptRaw?'active-toggle':''}`} onClick={()=>setShowPromptRaw(false)}>Colorido</button>
                      <button className={`btn btn-ghost btn-sm ${showPromptRaw?'active-toggle':''}`} onClick={()=>setShowPromptRaw(true)}>Texto bruto</button>
                      <button className="btn btn-primary btn-sm" onClick={handleCopiarPrompt}>Copiar prompt</button>
                    </>
                  )}
                </div>
              </div>
              <button className="btn btn-accent" onClick={handleGerar}>Gerar prompt</button>
              {promptFinal && (
                showPromptRaw ? (
                  <textarea className="textarea mono prompt-area" value={promptFinal} onChange={e=>setPromptFinal(e.target.value)} rows={20} />
                ) : (
                  <PromptColorido
                    texto={promptFinal}
                    comeco={comeco}
                    dadosQuestao={dadosQuestaoStr}
                    contexto={contextoStr}
                    finalText={finalText}
                  />
                )
              )}
            </section>
          )}

          {/* BLOCO 6 */}
          {promptFinal && (
            <section className="block block-ia">
              <h2 className="block-title">6. Resposta gerada pela IA</h2>
              <textarea className="textarea mono" placeholder="Cole aqui a resposta gerada pela IA..." value={respostaIA} onChange={e=>setRespostaIA(e.target.value)} rows={8} />
            </section>
          )}

          {/* BLOCO 7 */}
          {promptFinal && (
            <section className="block block-salvar">
              <h2 className="block-title">7. Salvar teste</h2>
              <div className="save-row">
                <div className="save-field">
                  <label className="field-label-block">Rótulo curto <span className="opcional">(opcional, máx. 25 chars)</span></label>
                  <input type="text" className="input" placeholder="ex: TESTE01" maxLength={25} value={rotulo} onChange={e=>setRotulo(slugify(e.target.value).slice(0,25))} />
                </div>
                <div className="save-id-preview">
                  <label className="field-label-block">ID gerado</label>
                  <code className="id-preview">{getIdParaSalvar(buildId(questaoSel,respostas,rotulo))||'—'}</code>
                </div>
              </div>
              <button className="btn btn-accent" onClick={handleSalvar}>{loadedFromHistory ? 'Salvar como novo teste' : 'Salvar teste'}</button>
              {saveWarn && <p className="warn-msg">{saveWarn}</p>}
            </section>
          )}

          {promptFinal && (
            <div className="restart-row">
              <button className="btn btn-restart" onClick={handleRecomecar}>↻ Recomeçar</button>
              <span>Limpa apenas o teste atual. O histórico continuará salvo.</span>
            </div>
          )}

        </main>
      )}

      {/* ── ABA: HISTÓRICO ── */}
      {activeTab === 'history' && (
        <main className="main-content">
          <section className="block">
            <div className="block-title-row">
              <h2 className="block-title">Histórico de testes</h2>
              <div style={{display:'flex',gap:8}}>
                <input ref={importRef} type="file" accept=".json" style={{display:'none'}} onChange={handleImportar} />
                <button className="btn btn-ghost btn-sm" onClick={()=>importRef.current?.click()}>↑ Importar JSON</button>
                {history.length > 0 && (
                  <button className="btn btn-ghost btn-sm" onClick={openModalExportarHist}>↓ Exportar JSON</button>
                )}
              </div>
            </div>

            {history.length === 0 && <p className="empty-msg">Nenhum teste salvo ainda.</p>}

            {history.map(item=>(
              <div key={item.id} className="hist-item">
                <div className="hist-header">
                  <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
                    <code className="hist-id">{item.id}</code>
                    <span className={`hist-badge ${item.status}`}>{item.status}</span>
                  </div>
                  <span className="hist-date">{new Date(item.criado_em).toLocaleString('pt-BR')}</span>
                </div>
                {(item.schema_version ?? 1) === 1 && <p className="legacy-notice">Este teste usa a versão antiga do questionário.</p>}
                <div className="hist-actions">
                  <button className="btn btn-ghost btn-xs" onClick={()=>setViewItem(viewItem?.id===item.id?null:item)}>{viewItem?.id===item.id?'Fechar':'Ver'}</button>
                  <button className="btn btn-primary btn-xs" onClick={()=>loadTestIntoBuilder(item)}>Abrir no criador</button>
                  <button className="btn btn-ghost btn-xs" onClick={()=>navigator.clipboard.writeText(item.id).then(()=>showToast('ID copiado!'))}>Copiar ID</button>
                  <button className="btn btn-ghost btn-xs" onClick={()=>navigator.clipboard.writeText(item.prompt_final || item.contexto_aluno_gerado || '').then(()=>showToast('Prompt copiado!'))}>Copiar prompt</button>
                  <button className="btn btn-ghost btn-xs" onClick={()=>downloadJson([item], `${item.id}.json`)}>Exportar este</button>
                  <button className="btn btn-danger btn-xs" onClick={()=>handleExcluir(item.id)}>Excluir</button>
                </div>
                {viewItem?.id===item.id && (
                  <div className="hist-detail">
                    {item.questao && <div className="detail-section"><p className="detail-label">Questão</p><p>{item.questao.nome || 'Questão importada'}{item.questao.enunciado ? ` — ${item.questao.enunciado}` : ''}</p></div>}
                    <div className="detail-section">
                      <p className="detail-label">Respostas</p>
                      <div className="respostas-grid">
                        {Object.entries(item.respostas_questionario || {}).map(([k,v])=>(
                          <span key={k} className="resposta-chip">{k}: {v}</span>
                        ))}
                      </div>
                    </div>
                    {item.observacao_professor && <div className="detail-section"><p className="detail-label">Observação do professor</p><p>{item.observacao_professor}</p></div>}
                    <div className="detail-section"><p className="detail-label">Contexto gerado</p><pre className="pre-block">{item.contexto_aluno_gerado}</pre></div>
                    <div className="detail-section"><p className="detail-label">Prompt final</p><pre className="pre-block">{item.prompt_final}</pre></div>
                    <div className="detail-section"><p className="detail-label">Resposta da IA</p><pre className="pre-block">{item.resposta_ia||'(não preenchida)'}</pre></div>
                  </div>
                )}
              </div>
            ))}
          </section>
        </main>
      )}
    </div>
  );
}
