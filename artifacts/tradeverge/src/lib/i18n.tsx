import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export const locales = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "fr", label: "Français", dir: "ltr" },
  { code: "es", label: "Español", dir: "ltr" },
  { code: "pt", label: "Português", dir: "ltr" },
  { code: "de", label: "Deutsch", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
  { code: "yo", label: "Yorùbá", dir: "ltr" },
  { code: "ha", label: "Hausa", dir: "ltr" },
  { code: "ig", label: "Igbo", dir: "ltr" },
  { code: "zh", label: "中文", dir: "ltr" },
] as const;

type Locale = (typeof locales)[number]["code"];
type Dictionary = Record<string, string>;

const en: Dictionary = {
  About: "About", Investments: "Investments", "How it works": "How it works", Fees: "Fees", Education: "Education",
  "Sign in": "Sign in", "Open an account": "Open an account", Explore: "Explore", Legal: "Legal", Security: "Security",
  FAQ: "FAQ", "Terms of service": "Terms of service", "Privacy policy": "Privacy policy", "Risk disclosure": "Risk disclosure",
  "Regulatory information": "Regulatory information", "Contact the office": "Contact the office", "Private account": "Private account",
  "Operations desk": "Operations desk", Settings: "Settings", "Exit workspace": "Exit workspace", "Account standing": "Account standing",
  "KYC status": "KYC status", "Good morning, Alex.": "Good morning, Alex.", "Good morning, team.": "Good morning, team.",
  "Total portfolio": "Total portfolio", "Invested value": "Invested value", "Available cash": "Available cash", "Net return": "Net return",
  "Active investments": "Active investments", "Recent activity": "Recent activity", "Portfolio value": "Portfolio value",
  "Add capital": "Add capital", "See all": "See all", "View all": "View all", "Pending review": "Pending review",
  "Publish draft": "Publish draft", Unpublish: "Unpublish", "Deposit review": "Deposit review", "Payment methods": "Payment methods",
  "Audit log": "Audit log", "New draft": "New draft", Approve: "Approve", Reject: "Reject", "Refresh": "Refresh",
  "Create an account": "Create an account", "Forgot password?": "Forgot password?", "Back to sign in": "Back to sign in",
  "Language": "Language", "Platform operational": "Platform operational", "Checking platform status": "Checking platform status",
  "Service status unavailable": "Service status unavailable", "Target return": "Target return", Duration: "Duration", Minimum: "Minimum",
  Liquidity: "Liquidity", "Record a deposit": "Record a deposit", "Request a withdrawal": "Request a withdrawal",
  Documents: "Documents", Notifications: "Notifications", Transactions: "Transactions", Portfolio: "Portfolio",
  "No account activity yet.": "No account activity yet.", "We could not load this view.": "We could not load this view.",
};

const dictionaries: Record<Locale, Dictionary> = {
  en,
  fr: {
    About: "À propos", Investments: "Investissements", "How it works": "Comment ça marche", Fees: "Tarifs", Education: "Éducation",
    "Sign in": "Se connecter", "Open an account": "Ouvrir un compte", Explore: "Explorer", Legal: "Juridique", Security: "Sécurité",
    FAQ: "FAQ", "Terms of service": "Conditions d'utilisation", "Privacy policy": "Politique de confidentialité", "Risk disclosure": "Divulgation des risques",
    "Regulatory information": "Informations réglementaires", "Contact the office": "Contacter le bureau", "Private account": "Compte privé",
    "Operations desk": "Bureau des opérations", Settings: "Paramètres", "Exit workspace": "Quitter l'espace", "Account standing": "État du compte",
    "KYC status": "Statut KYC", "Good morning, Alex.": "Bonjour, Alex.", "Good morning, team.": "Bonjour, l'équipe.",
    "Total portfolio": "Portefeuille total", "Invested value": "Valeur investie", "Available cash": "Liquidités disponibles", "Net return": "Rendement net",
    "Active investments": "Investissements actifs", "Recent activity": "Activité récente", "Portfolio value": "Valeur du portefeuille",
    "Add capital": "Ajouter du capital", "See all": "Voir tout", "View all": "Tout voir", "Pending review": "En attente d'examen",
    "Publish draft": "Publier le brouillon", Unpublish: "Dépublier", "Deposit review": "Examen des dépôts", "Payment methods": "Modes de paiement",
    "Audit log": "Journal d'audit", "New draft": "Nouveau brouillon", Approve: "Approuver", Reject: "Rejeter", Refresh: "Actualiser",
    "Create an account": "Créer un compte", "Forgot password?": "Mot de passe oublié ?", "Back to sign in": "Retour à la connexion",
    Language: "Langue", "Platform operational": "Plateforme opérationnelle", "Checking platform status": "Vérification de la plateforme",
    "Service status unavailable": "Statut du service indisponible", "Target return": "Rendement cible", Duration: "Durée", Minimum: "Minimum",
    Liquidity: "Liquidité", "Record a deposit": "Enregistrer un dépôt", "Request a withdrawal": "Demander un retrait",
    Documents: "Documents", Notifications: "Notifications", Transactions: "Transactions", Portfolio: "Portefeuille",
  },
  es: {
    About: "Nosotros", Investments: "Inversiones", "How it works": "Cómo funciona", Fees: "Tarifas", Education: "Educación",
    "Sign in": "Iniciar sesión", "Open an account": "Abrir una cuenta", Explore: "Explorar", Legal: "Legal", Security: "Seguridad",
    FAQ: "Preguntas frecuentes", "Terms of service": "Términos de servicio", "Privacy policy": "Política de privacidad", "Risk disclosure": "Divulgación de riesgos",
    "Regulatory information": "Información regulatoria", "Contact the office": "Contactar a la oficina", "Private account": "Cuenta privada",
    "Operations desk": "Mesa de operaciones", Settings: "Configuración", "Exit workspace": "Salir del espacio", "Account standing": "Estado de la cuenta",
    "KYC status": "Estado KYC", "Good morning, Alex.": "Buenos días, Alex.", "Good morning, team.": "Buenos días, equipo.",
    "Total portfolio": "Cartera total", "Invested value": "Valor invertido", "Available cash": "Efectivo disponible", "Net return": "Rendimiento neto",
    "Active investments": "Inversiones activas", "Recent activity": "Actividad reciente", "Portfolio value": "Valor de cartera",
    "Add capital": "Añadir capital", "See all": "Ver todo", "View all": "Ver todo", "Pending review": "Revisión pendiente",
    "Publish draft": "Publicar borrador", Unpublish: "Retirar publicación", "Deposit review": "Revisión de depósitos", "Payment methods": "Métodos de pago",
    "Audit log": "Registro de auditoría", "New draft": "Nuevo borrador", Approve: "Aprobar", Reject: "Rechazar", Refresh: "Actualizar",
    "Create an account": "Crear una cuenta", "Forgot password?": "¿Olvidaste tu contraseña?", "Back to sign in": "Volver a iniciar sesión",
    Language: "Idioma", "Platform operational": "Plataforma operativa", "Checking platform status": "Comprobando plataforma",
    "Service status unavailable": "Estado del servicio no disponible", "Target return": "Rendimiento objetivo", Duration: "Duración", Minimum: "Mínimo",
    Liquidity: "Liquidez", "Record a deposit": "Registrar un depósito", "Request a withdrawal": "Solicitar un retiro",
    Documents: "Documentos", Notifications: "Notificaciones", Transactions: "Transacciones", Portfolio: "Cartera",
  },
  pt: {
    About: "Sobre nós", Investments: "Investimentos", "How it works": "Como funciona", Fees: "Taxas", Education: "Educação",
    "Sign in": "Entrar", "Open an account": "Abrir uma conta", Explore: "Explorar", Legal: "Legal", Security: "Segurança",
    FAQ: "Perguntas frequentes", "Terms of service": "Termos de serviço", "Privacy policy": "Política de privacidade", "Risk disclosure": "Divulgação de riscos",
    "Regulatory information": "Informações regulatórias", "Contact the office": "Falar com o escritório", "Private account": "Conta privada",
    "Operations desk": "Mesa de operações", Settings: "Configurações", "Exit workspace": "Sair do espaço", "Account standing": "Situação da conta",
    "KYC status": "Status KYC", "Good morning, Alex.": "Bom dia, Alex.", "Good morning, team.": "Bom dia, equipe.",
    "Total portfolio": "Portfólio total", "Invested value": "Valor investido", "Available cash": "Caixa disponível", "Net return": "Retorno líquido",
    "Active investments": "Investimentos ativos", "Recent activity": "Atividade recente", "Portfolio value": "Valor do portfólio",
    "Add capital": "Adicionar capital", "See all": "Ver tudo", "View all": "Ver tudo", "Pending review": "Revisão pendente",
    "Publish draft": "Publicar rascunho", Unpublish: "Despublicar", "Deposit review": "Revisão de depósitos", "Payment methods": "Métodos de pagamento",
    "Audit log": "Registro de auditoria", "New draft": "Novo rascunho", Approve: "Aprovar", Reject: "Rejeitar", Refresh: "Atualizar",
    "Create an account": "Criar uma conta", "Forgot password?": "Esqueceu a senha?", "Back to sign in": "Voltar para entrar",
    Language: "Idioma", "Platform operational": "Plataforma operacional", "Checking platform status": "Verificando a plataforma",
    "Service status unavailable": "Status do serviço indisponível", "Target return": "Retorno alvo", Duration: "Duração", Minimum: "Mínimo",
    Liquidity: "Liquidez", "Record a deposit": "Registrar um depósito", "Request a withdrawal": "Solicitar um saque",
    Documents: "Documentos", Notifications: "Notificações", Transactions: "Transações", Portfolio: "Portfólio",
  },
  de: {
    About: "Über uns", Investments: "Investitionen", "How it works": "So funktioniert es", Fees: "Gebühren", Education: "Bildung",
    "Sign in": "Anmelden", "Open an account": "Konto eröffnen", Explore: "Entdecken", Legal: "Rechtliches", Security: "Sicherheit",
    FAQ: "FAQ", "Terms of service": "Nutzungsbedingungen", "Privacy policy": "Datenschutz", "Risk disclosure": "Risikohinweis",
    "Regulatory information": "Regulatorische Informationen", "Contact the office": "Büro kontaktieren", "Private account": "Privates Konto",
    "Operations desk": "Operationszentrale", Settings: "Einstellungen", "Exit workspace": "Arbeitsbereich verlassen", "Account standing": "Kontostatus",
    "KYC status": "KYC-Status", "Good morning, Alex.": "Guten Morgen, Alex.", "Good morning, team.": "Guten Morgen, Team.",
    "Total portfolio": "Gesamtportfolio", "Invested value": "Investierter Wert", "Available cash": "Verfügbares Guthaben", "Net return": "Nettorendite",
    "Active investments": "Aktive Investitionen", "Recent activity": "Letzte Aktivitäten", "Portfolio value": "Portfolio-Wert",
    "Add capital": "Kapital hinzufügen", "See all": "Alle anzeigen", "View all": "Alle anzeigen", "Pending review": "Prüfung ausstehend",
    "Publish draft": "Entwurf veröffentlichen", Unpublish: "Veröffentlichung aufheben", "Deposit review": "Einzahlungsprüfung", "Payment methods": "Zahlungsmethoden",
    "Audit log": "Audit-Protokoll", "New draft": "Neuer Entwurf", Approve: "Genehmigen", Reject: "Ablehnen", Refresh: "Aktualisieren",
    "Create an account": "Konto erstellen", "Forgot password?": "Passwort vergessen?", "Back to sign in": "Zur Anmeldung",
    Language: "Sprache", "Platform operational": "Plattform betriebsbereit", "Checking platform status": "Plattformstatus wird geprüft",
    "Service status unavailable": "Dienststatus nicht verfügbar", "Target return": "Zielrendite", Duration: "Laufzeit", Minimum: "Minimum",
    Liquidity: "Liquidität", "Record a deposit": "Einzahlung erfassen", "Request a withdrawal": "Auszahlung anfordern",
    Documents: "Dokumente", Notifications: "Benachrichtigungen", Transactions: "Transaktionen", Portfolio: "Portfolio",
  },
  ar: {
    About: "من نحن", Investments: "الاستثمارات", "How it works": "كيف يعمل", Fees: "الرسوم", Education: "التعليم",
    "Sign in": "تسجيل الدخول", "Open an account": "فتح حساب", Explore: "استكشف", Legal: "قانوني", Security: "الأمان",
    FAQ: "الأسئلة الشائعة", "Terms of service": "شروط الخدمة", "Privacy policy": "سياسة الخصوصية", "Risk disclosure": "إفصاح المخاطر",
    "Regulatory information": "المعلومات التنظيمية", "Contact the office": "تواصل مع المكتب", "Private account": "حساب خاص",
    "Operations desk": "مكتب العمليات", Settings: "الإعدادات", "Exit workspace": "مغادرة مساحة العمل", "Account standing": "حالة الحساب",
    "KYC status": "حالة اعرف عميلك", "Good morning, Alex.": "صباح الخير، أليكس.", "Good morning, team.": "صباح الخير، أيها الفريق.",
    "Total portfolio": "إجمالي المحفظة", "Invested value": "القيمة المستثمرة", "Available cash": "النقد المتاح", "Net return": "العائد الصافي",
    "Active investments": "الاستثمارات النشطة", "Recent activity": "النشاط الأخير", "Portfolio value": "قيمة المحفظة",
    "Add capital": "إضافة رأس مال", "See all": "عرض الكل", "View all": "عرض الكل", "Pending review": "قيد المراجعة",
    "Publish draft": "نشر المسودة", Unpublish: "إلغاء النشر", "Deposit review": "مراجعة الإيداعات", "Payment methods": "طرق الدفع",
    "Audit log": "سجل التدقيق", "New draft": "مسودة جديدة", Approve: "موافقة", Reject: "رفض", Refresh: "تحديث",
    "Create an account": "إنشاء حساب", "Forgot password?": "هل نسيت كلمة المرور؟", "Back to sign in": "العودة لتسجيل الدخول",
    Language: "اللغة", "Platform operational": "المنصة تعمل", "Checking platform status": "جارٍ فحص حالة المنصة",
    "Service status unavailable": "حالة الخدمة غير متاحة", "Target return": "العائد المستهدف", Duration: "المدة", Minimum: "الحد الأدنى",
    Liquidity: "السيولة", "Record a deposit": "تسجيل إيداع", "Request a withdrawal": "طلب سحب",
    Documents: "المستندات", Notifications: "الإشعارات", Transactions: "المعاملات", Portfolio: "المحفظة",
  },
  yo: {
    About: "Nipa wa", Investments: "Idoko-owo", "How it works": "Bí ó ṣe ń ṣiṣẹ́", Fees: "Owó iṣẹ́", Education: "Ẹ̀kọ́",
    "Sign in": "Wọlé", "Open an account": "Ṣí àkáǹtì", Explore: "Ṣàwárí", Legal: "Òfin", Security: "Ààbò",
    "Private account": "Àkáǹtì àdáni", "Operations desk": "Ọ́fíìsì iṣẹ́", Settings: "Ètò", "Exit workspace": "Jáde",
    "Account standing": "Ipò àkáǹtì", "KYC status": "Ipò KYC", "Good morning, Alex.": "Ẹ káàárọ̀, Alex.", "Good morning, team.": "Ẹ káàárọ̀, ẹgbẹ́.",
    "Total portfolio": "Àpapọ̀ portfolio", "Invested value": "Iye tí a fi sí idoko", "Available cash": "Owó tó wà", "Net return": "Èrè net",
    "Active investments": "Idoko tó ń ṣiṣẹ́", "Recent activity": "Iṣẹ́ àìpẹ́", "Portfolio value": "Iye portfolio", "Add capital": "Fi owó kún",
    "See all": "Wo gbogbo", "View all": "Wo gbogbo", "Pending review": "Ń dúró fún àyẹ̀wò", "Publish draft": "Tẹ àkọ́kọ́ jáde",
    "Audit log": "Àkọsílẹ̀ audit", "New draft": "Àkọ́kọ́ tuntun", Approve: "Fọwọ́sí", Reject: "Kọ̀", Refresh: "Tún ṣe",
    Language: "Èdè", "Target return": "Èrè tí a lékè", Duration: "Àkókò", Minimum: "Kéré jù", Liquidity: "Owó tó rọrùn",
    "Record a deposit": "Kọ ìdókòwò sílẹ̀", "Request a withdrawal": "Béèrè yíyọ owó", Documents: "Àwọn ìwé", Notifications: "Àwọn ìfitónilétí",
    Transactions: "Àwọn ìṣòwò", Portfolio: "Portfolio",
  },
  ha: {
    About: "Game da mu", Investments: "Zuba jari", "How it works": "Yadda yake aiki", Fees: "Kudade", Education: "Ilimi",
    "Sign in": "Shiga", "Open an account": "Bude asusu", Explore: "Bincika", Legal: "Doka", Security: "Tsaro",
    "Private account": "Asusun sirri", "Operations desk": "Sashen ayyuka", Settings: "Saituna", "Exit workspace": "Fita",
    "Account standing": "Matsayin asusu", "KYC status": "Matsayin KYC", "Good morning, Alex.": "Ina kwana, Alex.", "Good morning, team.": "Ina kwana, tawaga.",
    "Total portfolio": "Jimillar portfolio", "Invested value": "Darajar zuba jari", "Available cash": "Kudin da ake da shi", "Net return": "Riba ta karshe",
    "Active investments": "Zuba jari masu aiki", "Recent activity": "Ayyukan baya-bayan nan", "Portfolio value": "Darajar portfolio", "Add capital": "Kara jari",
    "See all": "Duba duka", "View all": "Duba duka", "Pending review": "Ana jiran dubawa", "Publish draft": "Buga daftari",
    "Audit log": "Tarihin audit", "New draft": "Sabon daftari", Approve: "Amince", Reject: "Ki", Refresh: "Sabunta",
    Language: "Harshe", "Target return": "Ribar da ake nufi", Duration: "Tsawon lokaci", Minimum: "Mafi karanci", Liquidity: "Saukin cire kudi",
    "Record a deposit": "Rubuta ajiya", "Request a withdrawal": "Nemi cire kudi", Documents: "Takardu", Notifications: "Sanarwa",
    Transactions: "Mu'amaloli", Portfolio: "Portfolio",
  },
  ig: {
    About: "Banyere anyị", Investments: "Ntinye ego", "How it works": "Otu o si arụ ọrụ", Fees: "Ụgwọ", Education: "Mmụta",
    "Sign in": "Banye", "Open an account": "Mepee akaụntụ", Explore: "Chọgharịa", Legal: "Iwu", Security: "Nchekwa",
    "Private account": "Akaụntụ nkeonwe", "Operations desk": "Ụlọ ọrụ arụmọrụ", Settings: "Ntọala", "Exit workspace": "Pụọ",
    "Account standing": "Ọnọdụ akaụntụ", "KYC status": "Ọnọdụ KYC", "Good morning, Alex.": "Ụtụtụ ọma, Alex.", "Good morning, team.": "Ụtụtụ ọma, otu.",
    "Total portfolio": "Ngụkọta portfolio", "Invested value": "Uru ntinye ego", "Available cash": "Ego dị", "Net return": "Nloghachi net",
    "Active investments": "Ntinye ego na-arụ ọrụ", "Recent activity": "Ọrụ kacha nso", "Portfolio value": "Uru portfolio", "Add capital": "Tinye isi ego",
    "See all": "Lee ha niile", "View all": "Lee ha niile", "Pending review": "Na-eche nyocha", "Publish draft": "Bipụta akwụkwọ mbido",
    "Audit log": "Akwụkwọ audit", "New draft": "Akwụkwọ mbido ọhụrụ", Approve: "Kwado", Reject: "Jụ", Refresh: "Melite",
    Language: "Asụsụ", "Target return": "Nloghachi e bu n'uche", Duration: "Ogologo oge", Minimum: "Nke kacha nta", Liquidity: "Ọnọdụ ego",
    "Record a deposit": "Dekọọ nkwụnye ego", "Request a withdrawal": "Rịọ iwepụ ego", Documents: "Akwụkwọ", Notifications: "Ọkwa",
    Transactions: "Azụmahịa", Portfolio: "Portfolio",
  },
  zh: {
    About: "关于我们", Investments: "投资", "How it works": "运作方式", Fees: "费用", Education: "教育",
    "Sign in": "登录", "Open an account": "开设账户", Explore: "探索", Legal: "法律", Security: "安全",
    "Private account": "私人账户", "Operations desk": "运营中心", Settings: "设置", "Exit workspace": "退出工作区",
    "Account standing": "账户状态", "KYC status": "KYC 状态", "Good morning, Alex.": "早上好，Alex。", "Good morning, team.": "早上好，团队。",
    "Total portfolio": "总投资组合", "Invested value": "投资价值", "Available cash": "可用现金", "Net return": "净回报",
    "Active investments": "活跃投资", "Recent activity": "近期活动", "Portfolio value": "投资组合价值", "Add capital": "增加资金",
    "See all": "查看全部", "View all": "查看全部", "Pending review": "待审核", "Publish draft": "发布草稿",
    "Audit log": "审计日志", "New draft": "新建草稿", Approve: "批准", Reject: "拒绝", Refresh: "刷新",
    Language: "语言", "Target return": "目标回报", Duration: "期限", Minimum: "最低金额", Liquidity: "流动性",
    "Record a deposit": "记录存款", "Request a withdrawal": "申请提款", Documents: "文件", Notifications: "通知",
    Transactions: "交易", Portfolio: "投资组合",
  },
};

type I18nValue = { locale: Locale; setLocale: (locale: Locale) => void; t: (key: string) => string };
const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem("tradeverge-locale") as Locale | null;
    return locales.some((item) => item.code === saved) ? saved! : "en";
  });
  const setLocale = (next: Locale) => {
    setLocaleState(next);
    localStorage.setItem("tradeverge-locale", next);
  };
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locales.find((item) => item.code === locale)?.dir ?? "ltr";
  }, [locale]);
  const value = useMemo(() => ({ locale, setLocale, t: (key: string) => dictionaries[locale][key] ?? en[key] ?? key }), [locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside I18nProvider");
  return value;
}

export function LanguageSelect({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useI18n();
  return (
    <label className={`inline-flex items-center gap-2 text-xs ${compact ? "text-[#dce6db]" : "text-muted-foreground"}`}>
      <span className="sr-only">{t("Language")}</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        aria-label={t("Language")}
        className={`rounded-md border bg-transparent px-2 py-1.5 outline-none focus:ring-2 focus:ring-accent ${compact ? "border-[#607e6d]" : "border-border"}`}
      >
        {locales.map((item) => <option key={item.code} value={item.code} className="bg-primary text-[#f4efdf]">{item.label}</option>)}
      </select>
    </label>
  );
}