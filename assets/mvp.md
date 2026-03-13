<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>ChamaOFix — App</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap" rel="stylesheet"/>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --or:#FF5C1A;--or2:#FF7A3D;--or-glow:rgba(255,92,26,0.2);
  --dk:#0C0C0C;--dk2:#141414;--dk3:#1C1C1C;--dk4:#252525;--dk5:#2E2E2E;
  --tx:#F2EFE9;--tx2:#A8A39C;--tx3:#6B6560;
  --green:#22C55E;--blue:#3B82F6;--red:#EF4444;--yellow:#F59E0B;
  --card:rgba(255,255,255,0.04);--border:rgba(255,255,255,0.08);
  --r:20px;
}
html,body{height:100%;font-family:'DM Sans',sans-serif;background:#111;color:var(--tx);overflow:hidden;}

/_ PHONE FRAME _/
.frame-wrap{
display:flex;align-items:center;justify-content:center;
height:100vh;background:linear-gradient(135deg,#0a0a0a 0%,#111 50%,#0d0d0d 100%);
gap:40px;flex-wrap:wrap;padding:20px;
}
.frame-wrap::before{
content:'';position:fixed;inset:0;
background:radial-gradient(ellipse at 30% 50%,rgba(255,92,26,0.06) 0%,transparent 60%),
radial-gradient(ellipse at 70% 50%,rgba(59,130,246,0.04) 0%,transparent 60%);
pointer-events:none;
}

.phone{
width:390px;height:844px;
background:var(--dk);
border-radius:50px;
border:1.5px solid rgba(255,255,255,0.12);
overflow:hidden;
position:relative;
box-shadow:0 40px 100px rgba(0,0,0,0.8),0 0 0 1px rgba(255,255,255,0.04),inset 0 1px 0 rgba(255,255,255,0.1);
flex-shrink:0;
}

/_ STATUS BAR _/
.status-bar{
display:flex;justify-content:space-between;align-items:center;
padding:14px 28px 0;font-size:0.75rem;font-weight:600;
position:relative;z-index:10;
}
.status-notch{
position:absolute;top:0;left:50%;transform:translateX(-50%);
width:120px;height:34px;background:#000;border-radius:0 0 20px 20px;
z-index:20;
}
.status-time{font-size:0.9rem;font-weight:700;letter-spacing:-0.02em;}
.status-icons{display:flex;gap:6px;align-items:center;font-size:0.7rem;}

/_ SCREENS _/
.screen{
position:absolute;inset:0;
overflow-y:auto;overflow-x:hidden;
background:var(--dk);
transition:transform 0.4s cubic-bezier(0.32,0,0.2,1),opacity 0.4s ease;
scrollbar-width:none;
}
.screen::-webkit-scrollbar{display:none;}
.screen.hidden{transform:translateX(100%);opacity:0;pointer-events:none;}
.screen.slide-left{transform:translateX(-30%);opacity:0;pointer-events:none;}

/_ BOTTOM NAV _/
.bottom-nav{
position:sticky;bottom:0;left:0;right:0;
background:rgba(12,12,12,0.95);
backdrop-filter:blur(20px);
border-top:1px solid var(--border);
display:flex;justify-content:space-around;
padding:12px 0 24px;
z-index:50;
}
.nav-item{
display:flex;flex-direction:column;align-items:center;gap:4px;
font-size:0.65rem;color:var(--tx3);cursor:pointer;
padding:4px 16px;border-radius:12px;
transition:all 0.2s;
}
.nav-item.active{color:var(--or);}
.nav-item svg{width:22px;height:22px;}

/_ =================== HOME SCREEN =================== _/
#screen-home .top-bar{
padding:50px 24px 20px;
background:linear-gradient(180deg,rgba(255,92,26,0.06) 0%,transparent 100%);
}
.greeting{font-size:0.85rem;color:var(--tx2);margin-bottom:4px;}
.greeting-name{
font-family:'Syne',sans-serif;font-size:1.5rem;font-weight:800;
letter-spacing:-0.03em;
}
.greeting-name span{color:var(--or);}

.search-box{
margin:20px 24px 0;
background:var(--dk3);
border:1px solid var(--border);
border-radius:16px;
padding:14px 18px;
display:flex;align-items:center;gap:12px;
cursor:pointer;
transition:all 0.2s;
}
.search-box:hover{border-color:var(--or);background:rgba(255,92,26,0.05);}
.search-box svg{color:var(--tx3);flex-shrink:0;}
.search-placeholder{color:var(--tx3);font-size:0.9rem;}

.section-title{
font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;
letter-spacing:-0.01em;
padding:24px 24px 12px;
display:flex;justify-content:space-between;align-items:center;
}
.see-all{font-family:'DM Sans',sans-serif;font-size:0.8rem;font-weight:400;color:var(--or);cursor:pointer;}

/_ Categories scroll _/
.cats-scroll{
display:flex;gap:12px;padding:0 24px 4px;
overflow-x:auto;scrollbar-width:none;
}
.cats-scroll::-webkit-scrollbar{display:none;}
.cat-pill{
display:flex;flex-direction:column;align-items:center;gap:8px;
flex-shrink:0;cursor:pointer;
transition:transform 0.2s;
}
.cat-pill:hover{transform:translateY(-2px);}
.cat-pill-icon{
width:60px;height:60px;
background:var(--dk3);border:1px solid var(--border);
border-radius:18px;display:flex;align-items:center;justify-content:center;
font-size:1.5rem;transition:all 0.2s;
}
.cat-pill.selected .cat-pill-icon{background:rgba(255,92,26,0.15);border-color:var(--or);}
.cat-pill-label{font-size:0.72rem;color:var(--tx2);text-align:center;max-width:64px;}

/_ Pro cards _/
.pros-scroll{
display:flex;gap:16px;padding:0 24px 8px;
overflow-x:auto;scrollbar-width:none;
}
.pros-scroll::-webkit-scrollbar{display:none;}
.pro-card-h{
flex-shrink:0;width:200px;
background:var(--dk3);border:1px solid var(--border);
border-radius:20px;overflow:hidden;cursor:pointer;
transition:all 0.25s;
}
.pro-card-h:hover{border-color:var(--or);transform:translateY(-3px);}
.pro-card-img{
height:100px;display:flex;align-items:center;justify-content:center;
font-size:2.8rem;position:relative;
}
.pro-badge{
position:absolute;top:8px;right:8px;
background:var(--green);color:white;
font-size:0.6rem;font-weight:700;padding:3px 8px;border-radius:100px;
}
.pro-card-body{padding:12px 14px;}
.pro-name{font-family:'Syne',sans-serif;font-weight:700;font-size:0.9rem;margin-bottom:2px;}
.pro-spec{font-size:0.75rem;color:var(--tx2);margin-bottom:8px;}
.pro-meta{display:flex;justify-content:space-between;align-items:center;}
.pro-rating{display:flex;align-items:center;gap:4px;font-size:0.75rem;color:var(--yellow);}
.pro-price{font-size:0.75rem;color:var(--tx2);}
.pro-price strong{color:var(--tx);font-weight:600;}

/_ Emergency banner _/
.emergency-banner{
margin:16px 24px;
background:linear-gradient(135deg,#2d0a0a,#3d1010);
border:1px solid rgba(239,68,68,0.3);
border-radius:16px;padding:16px 20px;
display:flex;align-items:center;gap:14px;cursor:pointer;
transition:all 0.2s;
}
.emergency-banner:hover{border-color:rgba(239,68,68,0.6);}
.em-icon{font-size:1.8rem;}
.em-text h4{font-family:'Syne',sans-serif;font-weight:700;font-size:0.9rem;color:#ff6b6b;margin-bottom:2px;}
.em-text p{font-size:0.75rem;color:var(--tx2);}
.em-arrow{margin-left:auto;color:var(--tx3);font-size:1.2rem;}

/_ =================== SEARCH SCREEN =================== _/
#screen-search .search-header{
padding:50px 24px 16px;
background:var(--dk);
position:sticky;top:0;z-index:10;
}
.search-input-wrap{
display:flex;align-items:center;gap:10px;
background:var(--dk3);border:1px solid var(--or);
border-radius:14px;padding:12px 16px;
}
.search-input-wrap input{
flex:1;background:transparent;border:none;outline:none;
color:var(--tx);font-size:0.95rem;font-family:'DM Sans',sans-serif;
}
.search-input-wrap input::placeholder{color:var(--tx3);}
.back-btn{
background:none;border:none;color:var(--tx2);cursor:pointer;
font-size:0.85rem;padding:4px 0;display:flex;align-items:center;gap:6px;
margin-bottom:12px;
}

.filter-row{
display:flex;gap:8px;padding:12px 24px;overflow-x:auto;scrollbar-width:none;
}
.filter-row::-webkit-scrollbar{display:none;}
.filter-chip{
flex-shrink:0;padding:8px 16px;border-radius:100px;
border:1px solid var(--border);background:var(--dk3);
font-size:0.8rem;color:var(--tx2);cursor:pointer;white-space:nowrap;
transition:all 0.2s;
}
.filter-chip.active{background:rgba(255,92,26,0.15);border-color:var(--or);color:var(--or);}

.results-list{padding:8px 24px 16px;}
.result-count{font-size:0.8rem;color:var(--tx3);margin-bottom:16px;}

.pro-card-v{
background:var(--dk3);border:1px solid var(--border);
border-radius:20px;padding:18px;margin-bottom:14px;
display:flex;gap:14px;cursor:pointer;
transition:all 0.25s;
}
.pro-card-v:hover{border-color:var(--or);transform:translateX(4px);}
.pro-avatar{
width:64px;height:64px;border-radius:16px;
display:flex;align-items:center;justify-content:center;
font-size:1.8rem;flex-shrink:0;position:relative;
}
.online-dot{
position:absolute;bottom:2px;right:2px;
width:12px;height:12px;background:var(--green);
border-radius:50%;border:2px solid var(--dk3);
}
.pro-info{flex:1;min-width:0;}
.pro-info-top{display:flex;justify-content:space-between;align-items:flex-start;}
.pro-info-name{font-family:'Syne',sans-serif;font-weight:700;font-size:0.95rem;}
.pro-info-price{font-size:0.8rem;color:var(--tx2);text-align:right;white-space:nowrap;}
.pro-info-price strong{display:block;color:var(--or);font-size:0.95rem;}
.pro-info-spec{font-size:0.78rem;color:var(--tx2);margin:4px 0 8px;}
.pro-info-meta{display:flex;gap:10px;align-items:center;flex-wrap:wrap;}
.tag{
background:rgba(255,255,255,0.06);border-radius:100px;
padding:3px 10px;font-size:0.7rem;color:var(--tx2);
}
.tag.green{background:rgba(34,197,94,0.1);color:var(--green);}

/_ =================== PROFILE SCREEN =================== _/
.profile-header{
position:relative;
background:linear-gradient(180deg,rgba(255,92,26,0.12) 0%,transparent 100%);
padding:50px 24px 24px;
}
.back-header{
display:flex;align-items:center;gap:10px;
margin-bottom:24px;cursor:pointer;
font-size:0.85rem;color:var(--tx2);
}
.back-header:hover{color:var(--tx);}
.profile-top{display:flex;gap:18px;align-items:flex-start;}
.profile-avatar{
width:90px;height:90px;border-radius:24px;
display:flex;align-items:center;justify-content:center;
font-size:2.8rem;border:2px solid rgba(255,92,26,0.3);
flex-shrink:0;position:relative;
}
.verified-badge{
position:absolute;bottom:-4px;right:-4px;
width:22px;height:22px;background:var(--blue);
border-radius:50%;display:flex;align-items:center;justify-content:center;
font-size:0.6rem;border:2px solid var(--dk);
}
.profile-meta{flex:1;}
.profile-name{font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;letter-spacing:-0.02em;}
.profile-spec{color:var(--or);font-size:0.85rem;font-weight:500;margin:4px 0 12px;}
.profile-stats{display:flex;gap:20px;}
.pstat{text-align:center;}
.pstat-val{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:800;color:var(--tx);}
.pstat-lbl{font-size:0.68rem;color:var(--tx3);}

.profile-section{padding:0 24px 24px;}
.profile-section-title{
font-family:'Syne',sans-serif;font-size:0.85rem;font-weight:700;
color:var(--tx3);text-transform:uppercase;letter-spacing:0.08em;
margin-bottom:12px;padding-top:20px;
border-top:1px solid var(--border);
}
.profile-bio{font-size:0.88rem;color:var(--tx2);line-height:1.6;}

.services-list{display:flex;flex-direction:column;gap:8px;}
.service-item{
background:var(--dk3);border:1px solid var(--border);
border-radius:12px;padding:12px 16px;
display:flex;justify-content:space-between;align-items:center;
}
.service-item-name{font-size:0.88rem;font-weight:500;}
.service-item-price{font-size:0.85rem;color:var(--or);font-weight:600;}

.reviews-list{display:flex;flex-direction:column;gap:12px;}
.review-item{background:var(--dk3);border-radius:14px;padding:14px 16px;}
.review-top{display:flex;justify-content:space-between;margin-bottom:8px;}
.review-author{font-size:0.85rem;font-weight:600;}
.review-stars{color:var(--yellow);font-size:0.8rem;}
.review-text{font-size:0.82rem;color:var(--tx2);line-height:1.5;}

.gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
.gallery-item{
aspect-ratio:1;border-radius:12px;
background:var(--dk3);display:flex;align-items:center;justify-content:center;
font-size:2rem;border:1px solid var(--border);
}

.book-bar{
position:sticky;bottom:0;
background:rgba(12,12,12,0.95);backdrop-filter:blur(20px);
border-top:1px solid var(--border);
padding:16px 24px 32px;
display:flex;gap:12px;align-items:center;
}
.price-info{}
.price-from{font-size:0.7rem;color:var(--tx3);}
.price-val{font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;color:var(--or);}
.price-unit{font-size:0.75rem;color:var(--tx3);}
.btn-book{
flex:1;background:var(--or);color:white;
border:none;border-radius:14px;padding:16px;
font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;
cursor:pointer;transition:all 0.2s;
box-shadow:0 4px 20px rgba(255,92,26,0.4);
}
.btn-book:hover{background:var(--or2);transform:translateY(-1px);}

/_ =================== BOOKING SCREEN =================== _/
.booking-screen{padding:50px 24px 100px;}
.booking-title{
font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;
letter-spacing:-0.02em;margin-bottom:6px;
}
.booking-sub{font-size:0.85rem;color:var(--tx2);margin-bottom:28px;}

.booking-pro-mini{
display:flex;align-items:center;gap:14px;
background:var(--dk3);border:1px solid var(--border);
border-radius:16px;padding:16px;margin-bottom:28px;
}
.booking-pro-mini .pro-avatar{width:48px;height:48px;font-size:1.4rem;border-radius:12px;}

.form-label{font-size:0.78rem;color:var(--tx3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;display:block;}
.form-group{margin-bottom:20px;}

.dates-row{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;padding-bottom:4px;}
.dates-row::-webkit-scrollbar{display:none;}
.date-chip{
flex-shrink:0;display:flex;flex-direction:column;align-items:center;
padding:10px 14px;border-radius:14px;
border:1px solid var(--border);background:var(--dk3);cursor:pointer;
transition:all 0.2s;
}
.date-chip.selected{background:var(--or);border-color:var(--or);}
.date-day{font-size:0.68rem;color:var(--tx3);margin-bottom:2px;}
.date-num{font-family:'Syne',sans-serif;font-weight:800;font-size:1.1rem;}
.date-chip.selected .date-day,.date-chip.selected .date-num{color:white;}

.times-row{display:flex;gap:8px;flex-wrap:wrap;}
.time-chip{
padding:10px 16px;border-radius:12px;
border:1px solid var(--border);background:var(--dk3);
font-size:0.85rem;cursor:pointer;transition:all 0.2s;
}
.time-chip.selected{background:rgba(255,92,26,0.15);border-color:var(--or);color:var(--or);}
.time-chip.busy{opacity:0.35;pointer-events:none;}

.form-textarea{
width:100%;background:var(--dk3);border:1px solid var(--border);
border-radius:14px;padding:14px;color:var(--tx);
font-family:'DM Sans',sans-serif;font-size:0.9rem;
resize:none;outline:none;min-height:90px;
transition:border-color 0.2s;
}
.form-textarea:focus{border-color:var(--or);}
.form-textarea::placeholder{color:var(--tx3);}

.confirm-btn{
width:100%;background:var(--or);color:white;border:none;
border-radius:16px;padding:18px;
font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;
cursor:pointer;transition:all 0.2s;margin-top:8px;
box-shadow:0 4px 24px rgba(255,92,26,0.4);
}
.confirm-btn:hover{background:var(--or2);transform:translateY(-1px);}

/_ =================== SUCCESS SCREEN =================== _/
#screen-success{
display:flex;flex-direction:column;align-items:center;justify-content:center;
text-align:center;padding:40px 32px;
}
.success-icon{
width:100px;height:100px;background:rgba(34,197,94,0.12);
border-radius:50%;display:flex;align-items:center;justify-content:center;
font-size:3rem;margin-bottom:24px;
border:2px solid rgba(34,197,94,0.3);
animation:pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
}
@keyframes pop{from{transform:scale(0);opacity:0;}to{transform:scale(1);opacity:1;}}
.success-title{font-family:'Syne',sans-serif;font-size:1.8rem;font-weight:800;margin-bottom:8px;}
.success-sub{color:var(--tx2);font-size:0.9rem;line-height:1.6;max-width:280px;}
.success-card{
width:100%;background:var(--dk3);border:1px solid var(--border);
border-radius:20px;padding:20px;margin:28px 0;text-align:left;
}
.success-card-row{
display:flex;justify-content:space-between;
font-size:0.85rem;padding:8px 0;border-bottom:1px solid var(--border);
}
.success-card-row:last-child{border-bottom:none;}
.success-card-row span:first-child{color:var(--tx3);}
.success-card-row span:last-child{font-weight:600;}

/_ =================== DASHBOARD SCREEN =================== _/
.dash-header{
padding:50px 24px 20px;
background:linear-gradient(180deg,rgba(255,92,26,0.08) 0%,transparent 100%);
}
.dash-title{font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:800;letter-spacing:-0.02em;}
.dash-sub{font-size:0.82rem;color:var(--tx2);margin-top:4px;}

.earnings-card{
margin:0 24px 20px;
background:linear-gradient(135deg,#1a0800,#2d1200);
border:1px solid rgba(255,92,26,0.25);
border-radius:20px;padding:24px;position:relative;overflow:hidden;
}
.earnings-card::after{
content:'';position:absolute;top:-40px;right:-40px;
width:120px;height:120px;
background:radial-gradient(circle,rgba(255,92,26,0.2),transparent 70%);
}
.earn-label{font-size:0.75rem;color:var(--tx3);text-transform:uppercase;letter-spacing:0.08em;}
.earn-val{font-family:'Syne',sans-serif;font-size:2.2rem;font-weight:800;color:var(--or);margin:6px 0;}
.earn-change{font-size:0.8rem;color:var(--green);}

.dash-stats{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:0 24px 20px;}
.dash-stat-card{
background:var(--dk3);border:1px solid var(--border);
border-radius:16px;padding:16px;
}
.ds-icon{font-size:1.4rem;margin-bottom:8px;}
.ds-val{font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;}
.ds-label{font-size:0.72rem;color:var(--tx3);margin-top:2px;}

.requests-list{padding:0 24px 16px;}
.req-item{
background:var(--dk3);border:1px solid var(--border);
border-radius:16px;padding:16px;margin-bottom:12px;
}
.req-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;}
.req-client{font-family:'Syne',sans-serif;font-weight:700;font-size:0.9rem;}
.req-status{
font-size:0.68rem;font-weight:700;padding:4px 10px;border-radius:100px;
}
.req-status.new{background:rgba(59,130,246,0.15);color:var(--blue);}
.req-status.confirmed{background:rgba(34,197,94,0.15);color:var(--green);}
.req-status.done{background:rgba(255,255,255,0.08);color:var(--tx3);}
.req-desc{font-size:0.8rem;color:var(--tx2);margin-bottom:10px;}
.req-meta{display:flex;gap:10px;}
.req-actions{display:flex;gap:8px;margin-top:10px;}
.btn-accept{
flex:1;background:rgba(34,197,94,0.15);color:var(--green);
border:1px solid rgba(34,197,94,0.3);border-radius:10px;
padding:8px;font-size:0.8rem;font-weight:600;cursor:pointer;
transition:all 0.2s;
}
.btn-accept:hover{background:rgba(34,197,94,0.25);}
.btn-decline{
flex:1;background:rgba(239,68,68,0.1);color:var(--red);
border:1px solid rgba(239,68,68,0.2);border-radius:10px;
padding:8px;font-size:0.8rem;font-weight:600;cursor:pointer;
transition:all 0.2s;
}

/_ SIDEBAR PANEL _/
.side-info{
width:280px;
background:rgba(255,255,255,0.03);
border:1px solid rgba(255,255,255,0.07);
border-radius:24px;padding:32px;
color:var(--tx);
}
.side-title{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:800;margin-bottom:20px;color:var(--or);}
.side-step{display:flex;gap:12px;margin-bottom:18px;align-items:flex-start;}
.side-step-num{
width:26px;height:26px;background:rgba(255,92,26,0.15);border:1px solid rgba(255,92,26,0.3);
border-radius:50%;display:flex;align-items:center;justify-content:center;
font-size:0.7rem;font-weight:700;color:var(--or);flex-shrink:0;margin-top:2px;
}
.side-step-text{font-size:0.82rem;color:var(--tx2);line-height:1.5;}
.side-step-text strong{color:var(--tx);display:block;margin-bottom:2px;}
.side-divider{border:none;border-top:1px solid rgba(255,255,255,0.07);margin:20px 0;}
.side-mode{
display:flex;gap:8px;margin-bottom:12px;
}
.mode-btn{
flex:1;padding:8px;border-radius:10px;border:1px solid var(--border);
background:var(--dk3);color:var(--tx2);font-size:0.78rem;cursor:pointer;
text-align:center;transition:all 0.2s;
}
.mode-btn.active{background:rgba(255,92,26,0.15);border-color:var(--or);color:var(--or);}

/_ ANIMATIONS _/
@keyframes fadeIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
.fade-in{animation:fadeIn 0.4s ease both;}

/_ Skeleton _/
.skel{
background:linear-gradient(90deg,var(--dk3) 25%,var(--dk4) 50%,var(--dk3) 75%);
background-size:200% 100%;
animation:shimmer 1.5s infinite;
border-radius:8px;
}
@keyframes shimmer{0%{background-position:200% 0;}100%{background-position:-200% 0;}}
</style>

</head>
<body>
<div class="frame-wrap">

  <!-- SIDE INFO -->
  <div class="side-info">
    <div class="side-title">📱 ChamaOFix MVP</div>
    <div class="side-step">
      <div class="side-step-num">1</div>
      <div class="side-step-text"><strong>Home</strong>Busque por categoria ou profissional próximo</div>
    </div>
    <div class="side-step">
      <div class="side-step-num">2</div>
      <div class="side-step-text"><strong>Resultados</strong>Filtre e compare profissionais com preço e avaliação</div>
    </div>
    <div class="side-step">
      <div class="side-step-num">3</div>
      <div class="side-step-text"><strong>Perfil</strong>Veja detalhes, galeria e avaliações reais</div>
    </div>
    <div class="side-step">
      <div class="side-step-num">4</div>
      <div class="side-step-text"><strong>Agendamento</strong>Escolha data, horário e confirme</div>
    </div>
    <hr class="side-divider"/>
    <div style="font-size:0.75rem;color:var(--tx3);margin-bottom:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;">Modo de visualização</div>
    <div class="side-mode">
      <div class="mode-btn active" onclick="setMode('client',this)">👤 Cliente</div>
      <div class="mode-btn" onclick="setMode('pro',this)">🔧 Prestador</div>
    </div>
    <div style="font-size:0.75rem;color:var(--tx3);line-height:1.5;">Alterne para ver o dashboard do prestador de serviços.</div>
  </div>

  <!-- PHONE -->
  <div class="phone">
    <div class="status-bar">
      <span class="status-time">9:41</span>
      <div class="status-notch"></div>
      <div class="status-icons">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><rect x="0" y="3" width="3" height="9" rx="1" opacity="0.4"/><rect x="4.5" y="2" width="3" height="10" rx="1" opacity="0.6"/><rect x="9" y="0" width="3" height="12" rx="1"/><rect x="13.5" y="1" width="2.5" height="10" rx="1"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.5C10.5 2.5 12.7 3.6 14.2 5.4L15.5 4C13.6 1.8 11 0.5 8 0.5C5 0.5 2.4 1.8 0.5 4L1.8 5.4C3.3 3.6 5.5 2.5 8 2.5Z" opacity="0.4"/><path d="M8 5.5C9.8 5.5 11.4 6.3 12.5 7.6L13.8 6.2C12.3 4.6 10.3 3.5 8 3.5C5.7 3.5 3.7 4.6 2.2 6.2L3.5 7.6C4.6 6.3 6.2 5.5 8 5.5Z" opacity="0.7"/><circle cx="8" cy="10" r="1.5"/></svg>
        <span style="font-size:0.7rem;font-weight:600;">100%</span>
      </div>
    </div>

    <!-- ===== HOME SCREEN ===== -->
    <div id="screen-home" class="screen fade-in">
      <div id="screen-home" class="screen fade-in">
      <div class="top-bar">
        <div class="greeting">Boa tarde,</div>
        <div class="greeting-name">João <span>👋</span></div>
        <div class="search-box" onclick="goTo('search')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span class="search-placeholder">Que serviço você precisa?</span>
        </div>
      </div>

      <div class="emergency-banner" onclick="goTo('search')">
        <div class="em-icon">🚨</div>
        <div class="em-text">
          <h4>Emergência? Estamos aqui</h4>
          <p>Profissionais disponíveis agora no seu bairro</p>
        </div>
        <div class="em-arrow">›</div>
      </div>

      <div class="section-title">Categorias <span class="see-all">ver todas</span></div>
      <div class="cats-scroll">
        <div class="cat-pill selected" onclick="goTo('search')">
          <div class="cat-pill-icon">🔧</div>
          <div class="cat-pill-label">Encanamento</div>
        </div>
        <div class="cat-pill" onclick="goTo('search')">
          <div class="cat-pill-icon">⚡</div>
          <div class="cat-pill-label">Elétrica</div>
        </div>
        <div class="cat-pill" onclick="goTo('search')">
          <div class="cat-pill-icon">🎨</div>
          <div class="cat-pill-label">Pintura</div>
        </div>
        <div class="cat-pill" onclick="goTo('search')">
          <div class="cat-pill-icon">🪚</div>
          <div class="cat-pill-label">Marcenaria</div>
        </div>
        <div class="cat-pill" onclick="goTo('search')">
          <div class="cat-pill-icon">🧹</div>
          <div class="cat-pill-label">Limpeza</div>
        </div>
        <div class="cat-pill" onclick="goTo('search')">
          <div class="cat-pill-icon">🚚</div>
          <div class="cat-pill-label">Mudança</div>
        </div>
      </div>

      <div class="section-title">Próximos a você <span class="see-all" onclick="goTo('search')">ver todos</span></div>
      <div class="pros-scroll">
        <div class="pro-card-h" onclick="goTo('profile')">
          <div class="pro-card-img" style="background:linear-gradient(135deg,#1a2a1a,#0d1a0d);">🔧<div class="pro-badge">Online</div></div>
          <div class="pro-card-body">
            <div class="pro-name">Carlos Silva</div>
            <div class="pro-spec">Encanador • 1.2km</div>
            <div class="pro-meta">
              <div class="pro-rating">★ 4.9 <span style="color:var(--tx3)">(87)</span></div>
              <div class="pro-price">a partir de <strong>R$90/h</strong></div>
            </div>
          </div>
        </div>
        <div class="pro-card-h" onclick="goTo('profile')">
          <div class="pro-card-img" style="background:linear-gradient(135deg,#1a1a2a,#0d0d1a);">⚡<div class="pro-badge">Online</div></div>
          <div class="pro-card-body">
            <div class="pro-name">Marcos Elétrica</div>
            <div class="pro-spec">Eletricista • 0.8km</div>
            <div class="pro-meta">
              <div class="pro-rating">★ 4.8 <span style="color:var(--tx3)">(54)</span></div>
              <div class="pro-price">a partir de <strong>R$120/h</strong></div>
            </div>
          </div>
        </div>
        <div class="pro-card-h" onclick="goTo('profile')">
          <div class="pro-card-img" style="background:linear-gradient(135deg,#2a1a1a,#1a0d0d);">🎨</div>
          <div class="pro-card-body">
            <div class="pro-name">Ana Pinturas</div>
            <div class="pro-spec">Pintora • 2.1km</div>
            <div class="pro-meta">
              <div class="pro-rating">★ 5.0 <span style="color:var(--tx3)">(32)</span></div>
              <div class="pro-price">a partir de <strong>R$80/h</strong></div>
            </div>
          </div>
        </div>
      </div>

      <div class="section-title" style="margin-top:8px;">Mais bem avaliados</div>
      <div style="padding:0 24px 100px;">
        <div class="pro-card-v" onclick="goTo('profile')">
          <div class="pro-avatar" style="background:linear-gradient(135deg,#1a2a1a,#0d1a0d);">🔧<div class="online-dot"></div></div>
          <div class="pro-info">
            <div class="pro-info-top">
              <div class="pro-info-name">Carlos Silva</div>
              <div class="pro-info-price"><strong>R$90–150</strong>/h</div>
            </div>
            <div class="pro-info-spec">Encanador • Vila Madalena</div>
            <div class="pro-info-meta">
              <span class="tag green">● Online</span>
              <span class="tag">★ 4.9</span>
              <span class="tag">1.2km</span>
            </div>
          </div>
        </div>
        <div class="pro-card-v" onclick="goTo('profile')">
          <div class="pro-avatar" style="background:linear-gradient(135deg,#1a1a2a,#0d0d1a);">⚡<div class="online-dot"></div></div>
          <div class="pro-info">
            <div class="pro-info-top">
              <div class="pro-info-name">Marcos Elétrica</div>
              <div class="pro-info-price"><strong>R$120–200</strong>/h</div>
            </div>
            <div class="pro-info-spec">Eletricista • Pinheiros</div>
            <div class="pro-info-meta">
              <span class="tag green">● Online</span>
              <span class="tag">★ 4.8</span>
              <span class="tag">0.8km</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom-nav">
        <div class="nav-item active">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          Início
        </div>
        <div class="nav-item" onclick="goTo('search')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          Buscar
        </div>
        <div class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Agenda
        </div>
        <div class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Perfil
        </div>
      </div>
    </div>

    <!-- ===== SEARCH SCREEN ===== -->
    <div id="screen-search" class="screen hidden">
      <div class="search-header">
        <button class="back-btn" onclick="goBack()">← Voltar</button>
        <div class="search-input-wrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--or)" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input type="text" placeholder="Encanador, eletricista..." value="Encanador"/>
        </div>
      </div>
      <div class="filter-row">
        <div class="filter-chip active">Todos</div>
        <div class="filter-chip">Online agora</div>
        <div class="filter-chip">Melhor avaliados</div>
        <div class="filter-chip">Menor preço</div>
        <div class="filter-chip">Mais próximos</div>
      </div>
      <div class="results-list">
        <div class="result-count">6 profissionais encontrados em Vila Madalena</div>
        <div class="pro-card-v" onclick="goTo('profile')">
          <div class="pro-avatar" style="background:linear-gradient(135deg,#1a2a1a,#0d1a0d);">🔧<div class="online-dot"></div></div>
          <div class="pro-info">
            <div class="pro-info-top">
              <div class="pro-info-name">Carlos Silva</div>
              <div class="pro-info-price"><strong>R$90–150</strong>/h</div>
            </div>
            <div class="pro-info-spec">Encanador há 12 anos</div>
            <div class="pro-info-meta">
              <span class="tag green">● Online</span>
              <span class="tag">★ 4.9 (87)</span>
              <span class="tag">1.2km</span>
            </div>
          </div>
        </div>
        <div class="pro-card-v" onclick="goTo('profile')">
          <div class="pro-avatar" style="background:linear-gradient(135deg,#2a1a0a,#1a0d00);">🔧</div>
          <div class="pro-info">
            <div class="pro-info-top">
              <div class="pro-info-name">Roberto Santos</div>
              <div class="pro-info-price"><strong>R$80–120</strong>/h</div>
            </div>
            <div class="pro-info-spec">Encanador • Hidráulica geral</div>
            <div class="pro-info-meta">
              <span class="tag">● Ocupado</span>
              <span class="tag">★ 4.7 (43)</span>
              <span class="tag">2.0km</span>
            </div>
          </div>
        </div>
        <div class="pro-card-v" onclick="goTo('profile')">
          <div class="pro-avatar" style="background:linear-gradient(135deg,#1a1a2a,#0d0d1a);">🔧<div class="online-dot"></div></div>
          <div class="pro-info">
            <div class="pro-info-top">
              <div class="pro-info-name">Pedro Hidráulica</div>
              <div class="pro-info-price"><strong>R$100–160</strong>/h</div>
            </div>
            <div class="pro-info-spec">Encanador • Especialista aquecedor</div>
            <div class="pro-info-meta">
              <span class="tag green">● Online</span>
              <span class="tag">★ 4.8 (61)</span>
              <span class="tag">3.5km</span>
            </div>
          </div>
        </div>
        <div class="pro-card-v" onclick="goTo('profile')">
          <div class="pro-avatar" style="background:linear-gradient(135deg,#2a2a1a,#1a1a00);">🔧</div>
          <div class="pro-info">
            <div class="pro-info-top">
              <div class="pro-info-name">Luiz Encanamentos</div>
              <div class="pro-info-price"><strong>R$70–110</strong>/h</div>
            </div>
            <div class="pro-info-spec">Encanador • Mais barato da região</div>
            <div class="pro-info-meta">
              <span class="tag">● Offline</span>
              <span class="tag">★ 4.5 (28)</span>
              <span class="tag">4.1km</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== PROFILE SCREEN ===== -->
    <div id="screen-profile" class="screen hidden">
      <div class="profile-header">
        <div class="back-header" onclick="goBack()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Resultados
        </div>
        <div class="profile-top">
          <div class="profile-avatar" style="background:linear-gradient(135deg,#1a2a1a,#0d1a0d);">
            🔧
            <div class="verified-badge">✓</div>
          </div>
          <div class="profile-meta">
            <div class="profile-name">Carlos Silva</div>
            <div class="profile-spec">🔧 Encanador Profissional</div>
            <div class="profile-stats">
              <div class="pstat"><div class="pstat-val">★ 4.9</div><div class="pstat-lbl">Avaliação</div></div>
              <div class="pstat"><div class="pstat-val">87</div><div class="pstat-lbl">Reviews</div></div>
              <div class="pstat"><div class="pstat-val">12a</div><div class="pstat-lbl">Experiência</div></div>
            </div>
          </div>
        </div>
      </div>

      <div class="profile-section">
        <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;">
          <span class="tag green">● Disponível agora</span>
          <span class="tag">📍 Vila Madalena, SP</span>
          <span class="tag">✓ Documentos verificados</span>
        </div>

        <div class="profile-section-title">Sobre</div>
        <p class="profile-bio">Encanador com 12 anos de experiência em residências e comércios. Especializado em vazamentos, entupimentos, instalação de aquecedores e reformas hidráulicas. Trabalho com garantia em todos os serviços.</p>

        <div class="profile-section-title">Serviços e Preços</div>
        <div class="services-list">
          <div class="service-item"><span class="service-item-name">🔍 Diagnóstico e visita</span><span class="service-item-price">R$ 80</span></div>
          <div class="service-item"><span class="service-item-name">💧 Conserto de vazamento</span><span class="service-item-price">R$90–150/h</span></div>
          <div class="service-item"><span class="service-item-name">🚿 Instalação de chuveiro</span><span class="service-item-price">R$ 120</span></div>
          <div class="service-item"><span class="service-item-name">🔥 Aquecedor a gás</span><span class="service-item-price">R$ 200</span></div>
          <div class="service-item"><span class="service-item-name">🚽 Vaso sanitário</span><span class="service-item-price">R$ 100</span></div>
        </div>

        <div class="profile-section-title">Trabalhos realizados</div>
        <div class="gallery-grid">
          <div class="gallery-item">🚿</div>
          <div class="gallery-item">🔩</div>
          <div class="gallery-item">💧</div>
          <div class="gallery-item">🔧</div>
          <div class="gallery-item">🏠</div>
          <div class="gallery-item">⚙️</div>
        </div>

        <div class="profile-section-title">Avaliações recentes</div>
        <div class="reviews-list">
          <div class="review-item">
            <div class="review-top"><span class="review-author">Mariana C.</span><span class="review-stars">★★★★★</span></div>
            <p class="review-text">"Carlos foi super profissional. Resolveu o vazamento em 40 minutos e ainda verificou o restante da tubulação. Recomendo muito!"</p>
          </div>
          <div class="review-item">
            <div class="review-top"><span class="review-author">Ricardo A.</span><span class="review-stars">★★★★★</span></div>
            <p class="review-text">"Chegou no horário combinado, preço justo conforme combinado. Ótimo trabalho, sem surpresas."</p>
          </div>
          <div class="review-item">
            <div class="review-top"><span class="review-author">Fernanda L.</span><span class="review-stars">★★★★☆</span></div>
            <p class="review-text">"Bom trabalho, só demorou um pouco mais que o previsto, mas resolveu o problema."</p>
          </div>
        </div>
      </div>

      <div class="book-bar">
        <div class="price-info">
          <div class="price-from">a partir de</div>
          <div><span class="price-val">R$90</span><span class="price-unit">/hora</span></div>
        </div>
        <button class="btn-book" onclick="goTo('booking')">📅 Agendar serviço</button>
      </div>
    </div>

    <!-- ===== BOOKING SCREEN ===== -->
    <div id="screen-booking" class="screen hidden">
      <div class="booking-screen">
        <button class="back-btn" onclick="goBack()">← Voltar</button>
        <div class="booking-title">Agendar serviço</div>
        <div class="booking-sub">Escolha o melhor horário para você</div>

        <div class="booking-pro-mini">
          <div class="pro-avatar" style="background:linear-gradient(135deg,#1a2a1a,#0d1a0d);width:48px;height:48px;font-size:1.4rem;border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center;">🔧</div>
          <div>
            <div style="font-family:'Syne',sans-serif;font-weight:700;font-size:0.9rem;">Carlos Silva</div>
            <div style="font-size:0.78rem;color:var(--tx2);">Encanador • R$90–150/h</div>
          </div>
          <div style="margin-left:auto;font-size:0.75rem;color:var(--green);">● Online</div>
        </div>

        <div class="form-group">
          <label class="form-label">Escolha a data</label>
          <div class="dates-row" id="dates-row"></div>
        </div>

        <div class="form-group">
          <label class="form-label">Horário disponível</label>
          <div class="times-row">
            <div class="time-chip busy">08:00</div>
            <div class="time-chip selected" onclick="selectTime(this)">09:00</div>
            <div class="time-chip" onclick="selectTime(this)">10:00</div>
            <div class="time-chip" onclick="selectTime(this)">11:00</div>
            <div class="time-chip busy">13:00</div>
            <div class="time-chip" onclick="selectTime(this)">14:00</div>
            <div class="time-chip" onclick="selectTime(this)">15:00</div>
            <div class="time-chip" onclick="selectTime(this)">16:00</div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Tipo de serviço</label>
          <div class="times-row">
            <div class="time-chip selected" onclick="selectTime(this)">Vazamento</div>
            <div class="time-chip" onclick="selectTime(this)">Entupimento</div>
            <div class="time-chip" onclick="selectTime(this)">Instalação</div>
            <div class="time-chip" onclick="selectTime(this)">Outro</div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Descreva o problema</label>
          <textarea class="form-textarea" placeholder="Ex: Cano sob a pia da cozinha está vazando. A torneira drena devagar há 2 dias..."></textarea>
        </div>

        <div style="background:var(--dk3);border:1px solid var(--border);border-radius:14px;padding:16px;margin-bottom:20px;">
          <div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:8px;"><span style="color:var(--tx3);">Visita + diagnóstico</span><span>R$ 80</span></div>
          <div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:8px;"><span style="color:var(--tx3);">Taxa de serviço</span><span>R$ 12</span></div>
          <div style="border-top:1px solid var(--border);padding-top:8px;margin-top:4px;display:flex;justify-content:space-between;font-family:'Syne',sans-serif;font-weight:700;"><span>Total estimado</span><span style="color:var(--or);">R$ 92+</span></div>
        </div>

        <button class="confirm-btn" onclick="goTo('success')">✓ Confirmar agendamento</button>
      </div>
    </div>

    <!-- ===== SUCCESS SCREEN ===== -->
    <div id="screen-success" class="screen hidden">
      <div class="success-icon">✓</div>
      <div class="success-title">Agendado!</div>
      <p class="success-sub">Carlos Silva foi notificado e confirmou seu horário. Você receberá um aviso quando ele sair.</p>

      <div class="success-card">
        <div class="success-card-row"><span>Profissional</span><span>Carlos Silva 🔧</span></div>
        <div class="success-card-row"><span>Serviço</span><span>Conserto de vazamento</span></div>
        <div class="success-card-row"><span>Data</span><span id="succ-date">—</span></div>
        <div class="success-card-row"><span>Horário</span><span>09:00</span></div>
        <div class="success-card-row"><span>Endereço</span><span>Rua das Flores, 42</span></div>
        <div class="success-card-row"><span>Valor estimado</span><span style="color:var(--or);">R$ 92+</span></div>
      </div>

      <button class="confirm-btn" style="margin:0;" onclick="goTo('home')">← Voltar ao início</button>
    </div>

    <!-- ===== DASHBOARD SCREEN (PRESTADOR) ===== -->
    <div id="screen-dashboard" class="screen hidden">
      <div class="dash-header">
        <div class="dash-title">Olá, Carlos 👷</div>
        <div class="dash-sub">Terça-feira, 10 de março de 2026</div>
      </div>

      <div class="earnings-card">
        <div class="earn-label">Ganhos esta semana</div>
        <div class="earn-val">R$ 1.840</div>
        <div class="earn-change">↑ 23% vs semana passada</div>
      </div>

      <div class="dash-stats">
        <div class="dash-stat-card">
          <div class="ds-icon">📅</div>
          <div class="ds-val">5</div>
          <div class="ds-label">Agendamentos hoje</div>
        </div>
        <div class="dash-stat-card">
          <div class="ds-icon">⭐</div>
          <div class="ds-val">4.9</div>
          <div class="ds-label">Avaliação média</div>
        </div>
        <div class="dash-stat-card">
          <div class="ds-icon">✅</div>
          <div class="ds-val">87</div>
          <div class="ds-label">Serviços feitos</div>
        </div>
        <div class="dash-stat-card">
          <div class="ds-icon">💬</div>
          <div class="ds-val">3</div>
          <div class="ds-label">Novas mensagens</div>
        </div>
      </div>

      <div class="requests-list">
        <div class="section-title" style="padding:8px 0 12px;">Solicitações recebidas</div>

        <div class="req-item">
          <div class="req-top">
            <div class="req-client">João Mendes</div>
            <div class="req-status new">Novo</div>
          </div>
          <div class="req-desc">Vazamento embaixo da pia da cozinha. Urgente.</div>
          <div class="req-meta">
            <span class="tag">📍 1.2km</span>
            <span class="tag">🕐 Hoje 14:00</span>
            <span class="tag" style="color:var(--or);">R$90–150</span>
          </div>
          <div class="req-actions">
            <button class="btn-accept">✓ Aceitar</button>
            <button class="btn-decline">✕ Recusar</button>
          </div>
        </div>

        <div class="req-item">
          <div class="req-top">
            <div class="req-client">Beatriz Lopes</div>
            <div class="req-status confirmed">Confirmado</div>
          </div>
          <div class="req-desc">Instalação de torneira nova no banheiro.</div>
          <div class="req-meta">
            <span class="tag">📍 0.8km</span>
            <span class="tag">🕐 Hoje 16:00</span>
            <span class="tag" style="color:var(--or);">R$ 120</span>
          </div>
        </div>

        <div class="req-item">
          <div class="req-top">
            <div class="req-client">Fernando Souza</div>
            <div class="req-status done">Concluído</div>
          </div>
          <div class="req-desc">Desentupimento de ralo do banheiro.</div>
          <div class="req-meta">
            <span class="tag">📍 2.0km</span>
            <span class="tag">🕐 Hoje 10:00</span>
            <span class="tag" style="color:var(--green);">R$ 90 pago</span>
          </div>
        </div>
      </div>

      <div style="height:80px;"></div>

      <div class="bottom-nav">
        <div class="nav-item active">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          Início
        </div>
        <div class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Agenda
        </div>
        <div class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          Ganhos
        </div>
        <div class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Perfil
        </div>
      </div>
    </div>

  </div><!-- /phone -->
</div><!-- /frame-wrap -->

<script>
const history = [];
let currentScreen = 'home';
let currentMode = 'client';

function goTo(screen) {
  const cur = document.getElementById('screen-' + currentScreen);
  const next = document.getElementById('screen-' + screen);
  if (!next || screen === currentScreen) return;
  cur.classList.add('slide-left');
  next.classList.remove('hidden');
  next.classList.remove('slide-left');
  setTimeout(() => { cur.classList.add('hidden'); }, 400);
  history.push(currentScreen);
  currentScreen = screen;
  if (screen === 'success') {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const opts = { weekday:'long', day:'numeric', month:'long' };
    document.getElementById('succ-date').textContent = d.toLocaleDateString('pt-BR', opts);
  }
}

function goBack() {
  if (history.length === 0) return;
  const prev = history.pop();
  const cur = document.getElementById('screen-' + currentScreen);
  const next = document.getElementById('screen-' + prev);
  cur.classList.add('hidden');
  next.classList.remove('hidden');
  next.classList.remove('slide-left');
  currentScreen = prev;
}

function selectTime(el) {
  el.closest('.times-row, .dates-row').querySelectorAll('.time-chip, .date-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

function selectDate(el) {
  document.querySelectorAll('.date-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

function setMode(mode, btn) {
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentMode = mode;
  const screens = ['home','search','profile','booking','success','dashboard'];
  screens.forEach(s => {
    const el = document.getElementById('screen-' + s);
    if (el) { el.classList.add('hidden'); el.classList.remove('slide-left'); }
  });
  history.length = 0;
  if (mode === 'pro') {
    currentScreen = 'dashboard';
    document.getElementById('screen-dashboard').classList.remove('hidden');
  } else {
    currentScreen = 'home';
    document.getElementById('screen-home').classList.remove('hidden');
  }
}

// Build dates
(function buildDates() {
  const row = document.getElementById('dates-row');
  if (!row) return;
  const days = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const chip = document.createElement('div');
    chip.className = 'date-chip' + (i === 1 ? ' selected' : '');
    chip.onclick = function() { selectDate(this); };
    chip.innerHTML = `<div class="date-day">${days[d.getDay()]}</div><div class="date-num">${d.getDate()}</div>`;
    row.appendChild(chip);
  }
})();
</script>
</body>
</html>
