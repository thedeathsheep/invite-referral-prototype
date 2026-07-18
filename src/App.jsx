import { useEffect, useState } from 'react';
import {
  ArrowRight, Bell, Check, ChevronDown, ChevronRight, CircleHelp, Clipboard,
  Gift, Link, LogOut, Menu, QrCode, Settings, ShieldCheck, Share2, Sparkles,
  MessageCircle, UserRound, WalletCards, X,
} from 'lucide-react';

const inviteCode = 'U8K3D2';
const inviteLink = `https://www.chuangyi.cn/login?cfrom=invite_center&invite_code=${inviteCode}&inviter_name=${encodeURIComponent('大魔术师')}&campaign_id=SPARK-01`;

function getInviteAttribution() {
  if (typeof window === 'undefined') {
    return { code: inviteCode, cfrom: 'invite_center', inviterName: '大魔术师' };
  }

  const pageParams = new URLSearchParams(window.location.search);
  const hashQuery = window.location.hash.includes('?') ? window.location.hash.split('?')[1] : '';
  const hashParams = new URLSearchParams(hashQuery);
  return {
    code: hashParams.get('invite_code') || pageParams.get('invite_code') || inviteCode,
    cfrom: hashParams.get('cfrom') || pageParams.get('cfrom') || 'invite_center',
    inviterName: hashParams.get('inviter_name') || pageParams.get('inviter_name') || '大魔术师',
  };
}

function getViewFromHash() {
  if (typeof window === 'undefined') {
    return 'home';
  }
  const routeHash = window.location.hash.split('?')[0];
  if (routeHash === '#register') {
    return 'register';
  }
  if (routeHash === '#invite-landing') {
    return 'landing';
  }
  if (routeHash === '#invite') {
    return 'invite';
  }
  return 'home';
}

const initialFriends = [
  { id: 1, name: '晓璇', date: '2024-05-10', status: 'recharged', label: '已首充', points: '+150', avatar: 'https://i.pravatar.cc/96?img=12' },
  { id: 2, name: '远山', date: '2024-05-09', status: 'used', label: '已使用', points: '+50', avatar: 'https://i.pravatar.cc/96?img=32' },
  { id: 3, name: '林深', date: '2024-05-08', status: 'registered', label: '已注册', points: '+50', avatar: 'https://i.pravatar.cc/96?img=11' },
];

function Avatar({ src, name }) {
  return <img className="avatar" src={src} alt={`${name}的头像`} />;
}

function StatusPill({ status }) {
  const config = {
    recharged: { label: '已首充', className: 'status-success' },
    used: { label: '已使用', className: 'status-used' },
    registered: { label: '已注册', className: 'status-active' },
  }[status];
  return <span className={`status-pill ${config.className}`}>{config.label}</span>;
}

function InviteCenter({ onBack }) {
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState('');
  const [rulesOpen, setRulesOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const visibleFriends = filter === 'all' ? initialFriends : initialFriends.filter((friend) => friend.status === filter);
  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(window.__inviteToastTimer);
    window.__inviteToastTimer = window.setTimeout(() => setToast(''), 2400);
  };
  const copyInviteLink = async () => {
    try { await navigator.clipboard.writeText(inviteLink); showToast('邀请链接已复制，去分享给好友吧'); }
    catch { showToast('复制失败，请长按链接复制'); }
  };
  return (
    <main className="page-shell">
      <header className="site-header">
        <div className="brand"><span className="brand-mark">塑</span><span>塑梦AI</span></div>
        <nav className="main-nav"><a href="#home" onClick={(event) => { event.preventDefault(); onBack(); }}>首页</a><a href="#tools">创作工具</a><a className="active" href="#invite">邀请中心</a></nav>
        <div className="header-actions">
          <button className="header-icon" aria-label="通知" onClick={() => showToast('暂时没有新的通知')}><Bell size={18} /></button>
          <div className="profile-wrap">
            <button className="profile-trigger" onClick={() => setProfileOpen((open) => !open)} aria-expanded={profileOpen}>
              <Avatar src="https://i.pravatar.cc/96?img=5" name="我的" /><span>大魔术师</span><ChevronDown size={15} />
            </button>
            {profileOpen && <div className="profile-menu">
              <strong>大魔术师（正式版）</strong><span className="profile-email">赠送积分 1,260</span>
              <button onClick={() => showToast('个人资料功能即将开放')}><UserRound size={15} />个人资料</button>
              <button onClick={() => showToast('设置功能即将开放')}><Settings size={15} />账号设置</button>
              <button onClick={() => showToast('已退出演示账号')}><LogOut size={15} />退出登录</button>
            </div>}
          </div>
        </div>
      </header>

      <div className="mobile-topbar"><button className="icon-button" aria-label="打开菜单" onClick={() => showToast('请使用右上角头像进入邀请中心')}><Menu size={21} /></button><strong>邀请中心</strong><button className="icon-button" aria-label="规则说明" onClick={() => setRulesOpen(true)}><CircleHelp size={19} /></button></div>

      <div className="workspace">
        <aside className="side-nav">
          <p className="side-label">个人中心</p>
          <a href="#overview"><UserRound size={17} />账号概览</a>
          <a href="#points"><Sparkles size={17} />我的积分</a>
          <a className="selected" href="#invite"><Gift size={17} />一起创作</a>
          <a href="#settings"><Settings size={17} />账号设置</a>
          <div className="side-help"><CircleHelp size={17} /><div><strong>需要帮助？</strong><span>查看活动规则</span></div><button onClick={() => setRulesOpen(true)} aria-label="查看活动规则"><ArrowRight size={15} /></button></div>
        </aside>

        <section className="content-area" id="invite">
          <div className="breadcrumb"><span>个人中心</span><ChevronRight size={14} /><strong>一起创作</strong></div>
          <div className="page-heading"><div><p className="eyebrow">INVITE &amp; EARN</p><h1>邀请好友，一起创作</h1><p>好友完成注册、开始创作并完成首次充值，累计最高可得 12 积分。</p></div><button className="rules-button" onClick={() => setRulesOpen(true)}><CircleHelp size={16} />奖励说明</button></div>

          <section className="balance-strip" aria-label="已获取积分">
            <div className="balance-icon"><Gift size={20} /></div><div className="balance-copy"><span>已获取积分</span><strong>1,260</strong></div><small>来自邀请活动，可用于平台现有消费范围</small>
          </section>

          <section className="invite-banner">
            <div className="banner-icon"><Share2 size={22} /></div><div className="banner-copy"><h2>分享你的创作邀请</h2><p>好友通过邀请链接注册后，系统将自动记录注册、使用与首充进度。</p></div><button className="primary-button" onClick={() => setShareOpen(true)}><Link size={18} />立即分享</button>
          </section>

          <div className="main-columns one-column">
            <section className="panel link-panel"><div className="panel-heading"><div><h2>我的邀请链接</h2><p>好友通过此链接注册，系统会自动记录邀请关系</p></div><Link size={20} className="panel-icon" /></div><div className="link-box"><span>{inviteLink}</span><button onClick={copyInviteLink}><Clipboard size={15} />复制</button></div><div className="code-row"><span>我的邀请码</span><strong>{inviteCode}</strong><button onClick={async () => { try { await navigator.clipboard.writeText(inviteCode); showToast('邀请码已复制'); } catch { showToast('复制失败，请手动记录邀请码'); } }}><Clipboard size={14} />复制邀请码</button></div><div className="link-actions"><button onClick={() => setShareOpen(true)}><Share2 size={15} />分享邀请</button><button onClick={() => showToast('二维码已准备好，演示版可使用分享弹窗')}><QrCode size={15} />查看二维码</button></div></section>
          </div>

          <section className="panel records-panel"><div className="panel-heading"><div><h2>邀请记录</h2><p>好友完成注册后开始记录，进度依次为已注册、已使用、已首充</p></div><label className="filter-select"><span className="sr-only">筛选邀请状态</span><select value={filter} onChange={(event) => setFilter(event.target.value)}><option value="all">全部状态</option><option value="registered">已注册</option><option value="used">已使用</option><option value="recharged">已首充</option></select><ChevronDown size={15} /></label></div><div className="record-table"><div className="table-head"><span>好友</span><span>注册时间</span><span>当前进度</span><span>奖励状态</span><span>积分</span><span /></div>{visibleFriends.map((friend) => <div className="table-row" key={friend.id}><span className="person-cell"><Avatar src={friend.avatar} name={friend.name} /><strong>{friend.name}</strong></span><span>{friend.date}</span><span><StatusPill status={friend.status} /></span><span className="reward-ready">已到账</span><strong className="points-earned">{friend.points}</strong><span aria-hidden="true" /></div>)}</div>{visibleFriends.length === 0 && <div className="empty-state">暂无符合条件的邀请记录</div>}<div className="table-foot"><span>共 {visibleFriends.length} 条记录</span><span>奖励将在 24 小时内到账；有疑问请联系客服</span></div></section>
          <footer className="trust-footer"><ShieldCheck size={16} />邀请真实好友，严禁刷量或其他作弊行为</footer>
        </section>
      </div>

      {toast && <div className="toast" role="status"><Check size={16} />{toast}</div>}
      {rulesOpen && <div className="overlay" onClick={() => setRulesOpen(false)}><section className="sheet" onClick={(event) => event.stopPropagation()}><div className="sheet-header"><h3>奖励说明</h3><button className="icon-button" onClick={() => setRulesOpen(false)} aria-label="关闭"><X size={20} /></button></div><div className="rule-list"><div><span className="rule-index">01</span><p><strong>好友完成注册</strong><small>邀请关系绑定成功后，记录注册进度并获得对应积分奖励。</small></p></div><div><span className="rule-index">02</span><p><strong>好友首次使用</strong><small>好友产生首次生成或对话消耗后，记录使用进度并获得对应积分奖励。</small></p></div><div><span className="rule-index">03</span><p><strong>好友完成首次充值</strong><small>首次充值成功后，记录首充进度并获得对应积分奖励。</small></p></div><div><span className="rule-index">04</span><p><strong>奖励到账</strong><small>奖励将在 24 小时内到账；有疑问请联系客服。</small></p></div></div></section></div>}
      {shareOpen && <div className="overlay" onClick={() => setShareOpen(false)}><section className="sheet share-sheet" onClick={(event) => event.stopPropagation()}><div className="sheet-header"><h3>分享给好友</h3><button className="icon-button" onClick={() => setShareOpen(false)} aria-label="关闭"><X size={20} /></button></div><div className="share-options"><button onClick={() => { copyInviteLink(); setShareOpen(false); }}><span className="share-icon blue"><Link size={20} /></span><span>复制链接</span></button><button onClick={() => showToast('二维码已准备好，长按即可保存')}><span className="share-icon mint"><QrCode size={20} /></span><span>二维码</span></button><button onClick={() => { showToast('已打开系统分享面板'); setShareOpen(false); }}><span className="share-icon yellow"><Share2 size={20} /></span><span>更多方式</span></button></div></section></div>}
    </main>
  );
}

function InviteLandingPage({ onRegister, attribution }) {
  return (
    <main className="landing-shell">
      <header className="landing-header">
        <div className="landing-brand"><span className="landing-brand-mark">塑</span><span>塑梦AI</span></div>
        <span className="landing-header-copy">AI 创意创作工具 · 短剧等多种内容</span>
      </header>

      <section className="landing-hero">
        <div className="landing-hero-content">
          <p className="landing-invite-source"><Gift size={16} /><strong>{attribution.inviterName}</strong> 邀请你一起创作</p>
          <h1>一起创作，<br />把灵感变成作品</h1>
          <p className="landing-reward-value"><strong>邀请好礼：12 积分</strong><span>约等于 Seedance 2.0 约 12 秒视频生成（720p）</span></p>
          <div className="landing-reward-examples" aria-label="积分使用示例">
            <div><span>Seedance 2.0</span><strong>约 12 秒视频</strong></div>
            <div><span>Seedance 2.0 Fast</span><strong>约 16 秒视频</strong></div>
            <div><span>塑梦 1.0 Reel</span><strong>约 25 秒视频</strong></div>
            <div><span>Image 2</span><strong>约 6 张 2K 图片</strong></div>
          </div>
          <button type="button" className="landing-primary-button" onClick={onRegister}>立即开始创作<ArrowRight size={18} /></button>
          <p className="landing-code-note">邀请码 <strong>{attribution.code}</strong> 已为你保留</p>
        </div>

        <div className="landing-creation-stage" aria-label="塑梦AI创作能力演示">
          <div className="creation-stage-mark">塑</div>
          <div className="creation-line creation-line-one"><span>灵感</span><strong>一张照片、一段文字，或任何突然冒出的想法</strong></div>
          <div className="creation-line creation-line-two"><span>对话</span><strong>和 AI 一起探索方向、补充细节、打磨表达</strong></div>
          <div className="creation-line creation-line-three"><span>生成</span><strong>短剧 · 文章 · 图片 · 方案 · 任何你想做的内容</strong></div>
        </div>
      </section>

      <section className="landing-footer">
        <div><h2>你的创意，从一个念头开始</h2><p>注册塑梦AI，进入属于你的 AI 创作工作台。</p></div>
        <button type="button" className="landing-primary-button light" onClick={onRegister}>立即开始创作<ArrowRight size={18} /></button>
      </section>

      <div className="landing-sticky-cta">
        <div><strong>一起创作</strong><span>邀请码已保留</span></div>
        <button type="button" onClick={onRegister}>立即开始<ArrowRight size={17} /></button>
      </div>
    </main>
  );
}

function RegistrationPage({ attribution, onBack, onLogin, onSuccess }) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState(attribution.code);
  const [submitted, setSubmitted] = useState(false);
  const normalizedCode = code.trim().toUpperCase();
  const isBusinessCode = normalizedCode.startsWith('BIZ-');
  const recordedAttribution = `${normalizedCode || '未填写'} / ${attribution.cfrom}`;

  if (submitted) {
    return <main className="register-shell register-success-shell">
      <section className="register-brand"><div className="register-brand-mark">塑</div><h1>创造属于你的 <span>作品世界</span></h1><p>塑梦AI，想到做到，一站式 AI 创意创作工具</p></section>
      <section className="register-panel register-success-panel">
        <p className="register-attribution">邀请来源已记录：{recordedAttribution}</p>
        <span className="register-success-icon"><Check size={28} /></span>
        <h2>注册成功</h2>
        <p className="register-success-copy">{isBusinessCode ? '商务关系已绑定，该邀请码不参与本活动奖励。' : normalizedCode ? '邀请关系已绑定，可以开始你的第一次创作了。' : '账号已创建，可以开始你的第一次创作了。'}</p>
        <button className="register-submit" type="button" onClick={onSuccess}>进入塑梦AI</button>
        <p className="register-note">本页面为交互原型，不会创建真实账户或发放积分。</p>
      </section>
    </main>;
  }

  return <main className="register-shell">
    <section className="register-brand"><div className="register-brand-mark">塑</div><h1>创造属于你的 <span>作品世界</span></h1><p>塑梦AI，想到做到，一站式 AI 创意创作工具</p></section>
    <section className="register-panel">
      <button className="register-close" onClick={onBack} aria-label="关闭注册页"><X size={20} /></button>
      <h2>欢迎</h2><p className="register-copy">注册你的塑梦AI账户，开始创作</p>
      <label className="register-field"><span>手机号</span><input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="输入你的手机号" disabled={submitted} /></label>
      <label className="register-field"><span>验证码</span><div className="register-input-row"><input placeholder="输入验证码" disabled={submitted} /><button type="button" onClick={() => {}} disabled={submitted}>获取验证码</button></div></label>
      <label className="register-field"><span>输入密码</span><input type="password" placeholder="输入密码" disabled={submitted} /></label>
      <label className="register-field"><span>确认密码</span><input type="password" placeholder="输入密码" disabled={submitted} /></label>
      <label className="register-field register-invite-field"><span>邀请码（选填）</span><input value={code} onChange={(event) => setCode(event.target.value.toUpperCase())} placeholder="输入邀请码" disabled={submitted} /></label>
      {normalizedCode && <p className={`register-hint${isBusinessCode ? ' business' : ''}`}>{isBusinessCode ? '该邀请码用于商务归因，不参与本活动奖励' : `已识别邀请来源：${normalizedCode}`}</p>}
      <button className="register-submit" onClick={() => setSubmitted(true)} disabled={submitted}>{submitted ? '注册成功，邀请关系已绑定' : '注册'}</button>
      <p className="register-login">已有账户？<button type="button" onClick={onLogin}>去登录</button></p>
    </section>
  </main>;
}

const templates = [
  { title: '修仙逆袭', copy: '废柴逆袭，热血升级，适合短视频装载', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80' },
  { title: '甜宠恋爱', copy: '霸总、甜宠、误会，高完播率公式', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80' },
  { title: '悬疑推理', copy: '层层反转，强冲突推进，追更率高', image: 'https://images.unsplash.com/photo-1518709779341-56cf4535e94b?auto=format&fit=crop&w=800&q=80' },
  { title: '大女主权谋', copy: '女主智斗夺权，步步为营', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80' },
  { title: '科幻机甲', copy: '星际战争、未来科技，宏大场景', image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=80' },
  { title: '沙雕搞笑', copy: '无厘头玩梗、轻松解压，下饭必备', image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=800&q=80' },
];

function Home({ onOpenInvite }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [toast, setToast] = useState('');
  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(window.__homeToastTimer);
    window.__homeToastTimer = window.setTimeout(() => setToast(''), 2400);
  };
  return <main className="home-shell">
    <div className="home-mobile-topbar"><button className="icon-button" aria-label="打开菜单" onClick={() => showToast('请使用右上角头像进入邀请中心')}><Menu size={20} /></button><strong>塑梦AI</strong><button className="icon-button" aria-label="打开邀请中心" onClick={onOpenInvite}><Gift size={19} /></button></div>
    <header className="site-header"><div className="brand"><span className="brand-mark">塑</span><span>塑梦AI</span></div><nav className="main-nav"><a className="active" href="#home">首页</a><a href="#tools">创作工具</a><a href="#projects">我的项目</a></nav><div className="header-actions"><button className="header-icon" aria-label="通知" onClick={() => showToast('暂时没有新的通知')}><Bell size={18} /></button><div className="profile-wrap"><button className="profile-trigger" onClick={() => setProfileOpen((open) => !open)} aria-expanded={profileOpen}><Avatar src="https://i.pravatar.cc/96?img=5" name="大魔术师" /><span>大魔术师</span><ChevronDown size={15} /></button>{profileOpen && <div className="profile-menu"><strong>大魔术师（正式版）</strong><span className="profile-email">赠送积分 1,260</span><button onClick={onOpenInvite}><Gift size={15} />邀请好友赚积分</button><button onClick={() => showToast('充值功能即将开放')}><WalletCards size={15} />充值积分</button><button onClick={() => showToast('个人中心功能即将开放')}><UserRound size={15} />个人中心</button><button onClick={() => showToast('已退出演示账号')}><LogOut size={15} />退出登录</button></div>}</div></div></header>
    <div className="home-workspace"><aside className="home-sidebar"><button className="sidebar-primary" onClick={() => showToast('已准备新建创作')}><span>+</span>开始创作</button><button className="sidebar-secondary" onClick={() => showToast('无限画布即将开放')}><Sparkles size={16} />无限画布</button><a href="#assets"><Link size={16} />资产库</a><div className="sidebar-group"><span>我的项目</span><ChevronDown size={14} /></div><div className="project-list"><span className="project-active">橙碎志不移</span><span>万剑朝宗：我以残脉逆天命</span><span>空白画布-26/07/13</span><span>雨夜预告：失忆记者</span><span>剑冢天命：逆修残脉</span></div><div className="sidebar-group recent"><span>最近会话</span><ChevronDown size={14} /></div><span className="session-item">新会话</span><span className="session-item">一个春天的故事</span><span className="session-item">生成图片</span></aside>
      <section className="home-main"><div className="welcome-mark">塑</div><h1>大魔术师（正式版），欢迎来到塑梦AI</h1><p className="welcome-copy">AI 驱动的创意工作台。从灵感到成品，通过对话完成你的创作流程。</p><section className="composer"><div className="composer-input">描述创作构思、上传素材或 @ 快速引用内容，从这里开始你的创作。<span className="caret" /></div><div className="composer-toolbar"><button onClick={() => showToast('附件上传功能即将开放')}><Link size={16} />上传附件</button><button onClick={() => showToast('已切换到创作 Agent')}>✦ 创作 Agent <ChevronDown size={14} /></button><button onClick={() => showToast('模型偏好功能即将开放')}>模型偏好 <ChevronDown size={14} /></button><button className="send-button" onClick={() => showToast('请先描述你的创作想法')}><ArrowRight size={17} /></button></div></section><button className="campaign-launcher" onClick={onOpenInvite}><span className="campaign-icon"><Gift size={22} /></span><span className="campaign-copy"><strong>邀请好友，一起创作</strong><small>好友完成注册、开始创作并完成首次充值，你将获得积分奖励</small></span><span className="campaign-cta">立即分享 <ArrowRight size={16} /></span><span className="campaign-code">SPARK-01</span></button><div className="template-heading"><span>或从模板快速开始</span><a href="#templates">查看全部 <ArrowRight size={14} /></a></div><div className="template-grid" id="templates">{templates.map((template) => <button className="template-card" key={template.title} onClick={() => showToast(`已选择${template.title}模板`)}><img src={template.image} alt="" /><span><strong>{template.title}</strong><small>{template.copy}</small></span></button>)}</div></section></div>{toast && <div className="toast" role="status"><Check size={16} />{toast}</div>}</main>;
}

export function App() {
  const [view, setView] = useState(() => getViewFromHash());
  const [attribution] = useState(() => getInviteAttribution());

  useEffect(() => {
    const handleHashChange = () => {
      setView(getViewFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (nextView) => {
    const nextHash = nextView === 'register' ? '#register' : nextView === 'landing' ? '#invite-landing' : nextView === 'invite' ? '#invite' : '#home';
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    } else {
      setView(nextView);
    }
  };

  if (view === 'register') {
    return <RegistrationPage attribution={attribution} onBack={() => navigate('landing')} onLogin={() => navigate('home')} onSuccess={() => navigate('home')} />;
  }

  if (view === 'landing') {
    return <InviteLandingPage attribution={attribution} onRegister={() => navigate('register')} />;
  }

  return view === 'home'
    ? <Home onOpenInvite={() => navigate('invite')} />
    : <InviteCenter onBack={() => navigate('home')} />;
}
