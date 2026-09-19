import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Bell, Box, CalendarDays, ChevronDown, ChevronLeft, ChevronRight, CircleDollarSign,
  ClipboardList, Cloud, CreditCard, Download, FilePlus2, Filter, Gift, LayoutDashboard,
  Menu, MessageCircle, MoreHorizontal, Package, Plus, ReceiptText, Search, Send,
  Settings, ShoppingBag, ShoppingCart, Sparkles, Store, Tags, Truck, UserPlus, Users,
  WalletCards, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Customer Due & Khata | Atelier Retail" },
    { name: "description", content: "Track customer dues, khata balances, payments, and reminders." },
    { property: "og:title", content: "Customer Due & Khata | Atelier Retail" },
    { property: "og:description", content: "Track customer dues, khata balances, payments, and reminders." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

const nav = [
  [LayoutDashboard, "Dashboard"], [ShoppingCart, "POS Checkout"], [CreditCard, "Sales & Transactions"],
  [Package, "Inventory"], [Truck, "Stock Transfer"], [Tags, "Products / Catalog"], [Users, "Customers (CRM)"],
  [UserPlus, "Suppliers"], [Gift, "Offers & Loyalty"], [ClipboardList, "Reports"], [Settings, "Store & Settings"],
] as const;

const customers = [
  ["Ali Khan", "Retail", "+91 98765 43210", "K-001", "₹12,480", "18 Aug 2024", 8],
  ["Priya Sharma", "Regular", "+91 98765 43211", "K-002", "₹8,940", "15 Aug 2024", 11],
  ["Rakesh Patel", "Wholesale", "+91 98765 43212", "K-003", "₹24,760", "12 Aug 2024", 14],
  ["Neha Jain", "Regular", "+91 98765 43213", "K-004", "₹6,230", "10 Aug 2024", 16],
  ["Arjun Mehta", "Retail", "+91 98765 43214", "K-005", "₹15,820", "05 Aug 2024", 21],
  ["Sneha Verma", "Regular", "+91 98765 43215", "K-006", "₹9,450", "28 Jul 2024", 29],
  ["Imran Shaikh", "Wholesale", "+91 98765 43216", "K-007", "₹32,600", "20 Jul 2024", 38],
  ["Pooja Desai", "Regular", "+91 98765 43217", "K-008", "₹11,720", "15 Jul 2024", 44],
  ["Karan Singh", "Retail", "+91 98765 43218", "K-009", "₹7,890", "10 Jul 2024", 50],
  ["Ayesha Khan", "VIP", "+91 98765 43219", "K-010", "₹18,450", "05 Jul 2024", 56],
] as const;

const tones = ["bg-accent text-primary", "bg-success-soft text-success", "bg-violet-soft text-chart-4", "bg-danger-soft text-destructive", "bg-violet-soft text-chart-4"];
const stats = [
  [Users, "Total Customers", "2,845", "+18.4%", "vs last month"],
  [CircleDollarSign, "Total Due Amount", "₹2,48,750", "+12.5%", "vs last month"],
  [ReceiptText, "Active Khata", "1,240", "+6.2%", "customers"],
  [Bell, "Overdue Customers", "342", "+3.4%", "vs last month"],
  [CalendarDays, "Avg. Days Pending", "18 days", "-6.2%", "vs last month"],
] as const;

const quickActions = [
  { icon: FilePlus2, title: "View All Dues", detail: "See complete pending dues" },
  { icon: MessageCircle, title: "Send Due Reminder", detail: "WhatsApp / SMS / Call" },
  { icon: WalletCards, title: "Create Khata", detail: "Open new khata for customer" },
  { icon: CircleDollarSign, title: "Collect Payment", detail: "Record customer payment" },
];

function InitialAvatar({ name, large = false }: { name: string; large?: boolean }) {
  return <span className={`${large ? "h-14 w-14 text-base" : "h-8 w-8 text-xs"} grid shrink-0 place-items-center rounded-full bg-secondary font-bold text-primary ring-2 ring-panel`}>{name.split(" ").map(v => v[0]).join("")}</span>;
}

function PanelTitle({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return <div className="flex h-11 items-center justify-between border-b border-border px-4"><h2 className="text-sm font-bold">{children}</h2>{action}</div>;
}

function Index() {
  const [sidebar, setSidebar] = useState(false);
  const [query, setQuery] = useState("");
  const [segment, setSegment] = useState("All Segments");
  const [group, setGroup] = useState("All Groups");
  const [selected, setSelected] = useState(0);
  const [tab, setTab] = useState("Khata History");
  const [notice, setNotice] = useState("");

  const filtered = useMemo(() => customers.filter(c => {
    const matches = `${c[0]} ${c[1]} ${c[2]} ${c[3]}`.toLowerCase().includes(query.toLowerCase());
    return matches && (segment === "All Segments" || c[1] === segment);
  }), [query, segment]);
  const [firstCustomer] = customers;
  const customer = customers[selected] ?? firstCustomer;
  const alert = (text: string) => { setNotice(text); window.setTimeout(() => setNotice(""), 2200); };
  const cycleSegment = () => setSegment(segment === "All Segments" ? "Retail" : segment === "Retail" ? "Regular" : segment === "Regular" ? "Wholesale" : segment === "Wholesale" ? "VIP" : "All Segments");
  const cycleGroup = () => setGroup(group === "All Groups" ? "High Due" : group === "High Due" ? "Overdue" : "All Groups");

  return <div className="min-h-screen bg-background text-foreground">
    {notice && <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-primary-foreground shadow-xl">{notice}</div>}
    <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center border-b border-border bg-panel">
      <div className="flex h-full w-[220px] shrink-0 items-center gap-3 border-r border-border px-5">
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" onClick={() => setSidebar(true)}><Menu /></Button>
        <div className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground"><ShoppingBag className="h-5 w-5" /></div>
        <div><div className="text-sm font-bold text-primary">ATELIER RETAIL</div><div className="text-[10px] text-muted-foreground">Garment POS · v2.4</div></div>
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-3 px-4">
        <Button variant="outline" className="hidden h-11 w-44 justify-between lg:flex"><span className="flex items-center gap-2"><Store className="text-primary"/><span className="text-left text-xs"><b className="block">Store #01</b>Indiranagar</span></span><ChevronDown /></Button>
        <div className="relative hidden max-w-xl flex-1 md:block"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/><Input className="h-11 pl-10" placeholder="Search by customer name, phone, khata no, or mobile..."/></div>
        <div className="hidden h-10 items-center gap-2 rounded-md border border-border px-3 text-xs font-semibold sm:flex"><span className="h-2 w-2 rounded-full bg-success"/> Store Online</div>
        <Button variant="outline" className="hidden h-11 text-xs xl:flex"><span><b className="block">Shift #02</b><span className="text-muted-foreground">Live</span></span></Button>
        <Button onClick={() => alert("New sale started")} className="ml-auto h-11"><Plus/> New Sale (F2)</Button>
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative"><Bell/><span className="absolute right-1 top-1 h-4 min-w-4 rounded-full bg-destructive text-[9px] text-primary-foreground">3</span></Button>
        <div className="hidden items-center gap-2 border-l border-border pl-4 lg:flex"><InitialAvatar name="Ramesh Sharma"/><div className="text-xs"><b>Ramesh Sharma</b><span className="block text-[10px] text-muted-foreground">Store Manager</span></div><ChevronDown className="h-3 w-3"/></div>
      </div>
    </header>

    <aside className={`${sidebar ? "translate-x-0" : "-translate-x-full"} fixed bottom-0 left-0 top-16 z-40 flex w-[220px] flex-col border-r border-border bg-panel transition-transform lg:translate-x-0`}>
      <Button variant="ghost" size="icon" className="absolute right-2 top-2 lg:hidden" onClick={() => setSidebar(false)}><X/></Button>
      <div className="m-4 rounded-md border border-border bg-background p-3 text-xs"><span className="text-[9px] font-semibold text-muted-foreground">ACTIVE OUTLET</span><div className="mt-2 flex justify-between font-bold">Indiranagar Store <span className="text-success">● Live</span></div><div className="text-right text-muted-foreground">#01</div></div>
      <nav className="space-y-1 px-3">{nav.map(([Icon, label]) => <Button key={label} variant={label === "Customers (CRM)" ? "secondary" : "ghost"} className={`w-full justify-start text-xs ${label === "Customers (CRM)" ? "text-primary" : ""}`}><Icon/> {label}</Button>)}</nav>
      <div className="mx-4 mt-auto mb-4 rounded-md bg-accent p-4 text-xs"><b className="text-primary">Manage Your Customers</b><p className="my-2 text-[10px] leading-4 text-muted-foreground">View dues, khata, history and send reminders.</p><Button size="sm" onClick={() => alert("Add customer form opened")}>Add Customer</Button></div>
      <div className="flex items-center justify-between border-t border-border px-5 py-4 text-[10px] text-muted-foreground"><span className="flex items-center gap-2 text-primary"><Cloud className="h-4 w-4"/> Cloud Sync</span><span>Last sync<br/>2 min ago</span></div>
    </aside>

    <main className="pt-16 lg:pl-[220px]">
      <div className="p-4 xl:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-2xl font-bold">Customer Due & Khata</h1><p className="text-sm text-muted-foreground">Track outstanding dues, manage khata and follow up with customers</p></div><div className="flex flex-wrap gap-2"><Button variant="outline" size="sm" onClick={() => alert("Reminder queued")}><Send/> Send Reminder</Button><Button variant="outline" size="sm" onClick={() => alert("Add customer form opened")}><Plus/> Add Customer</Button><Button variant="outline" size="sm" onClick={() => alert("Customer report exported")}><Download/> Export</Button><Button size="sm" onClick={() => alert("New khata opened")}><Plus/> New Khata</Button></div></div>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{stats.map(([Icon,label,value,change,note],i)=><article className="dashboard-panel flex min-h-24 items-center gap-4 p-4" key={label}><div className={`grid h-11 w-11 place-items-center rounded-lg ${tones[i]}`}><Icon/></div><div><p className="text-[11px] text-muted-foreground">{label}</p><strong className="text-xl">{value}</strong><p className={`text-[10px] font-bold ${i===3 ? "text-destructive" : "text-success"}`}>↑ {change}</p><p className="text-[9px] text-muted-foreground">{note}</p></div></article>)}</section>

        <section className="mt-3 grid gap-3 xl:grid-cols-[1fr_1.2fr_.75fr]">
          <article className="dashboard-panel"><PanelTitle>Customer Due Overview</PanelTitle><div className="flex items-center justify-around gap-4 p-5"><div className="relative h-32 w-32 shrink-0 rounded-full bg-[conic-gradient(var(--color-primary)_0_32%,var(--color-destructive)_32%_45%,var(--color-warning)_45%_71%,var(--color-success)_71%_92%,var(--color-chart-4)_92%)]"><div className="absolute inset-6 grid place-content-center rounded-full bg-panel text-center"><b>₹2,48,750</b><span className="text-[9px] text-muted-foreground">Total Due</span></div></div><div className="space-y-3 text-[10px]">{[["0 - 7 Days","₹78,420","bg-primary"],["8 - 15 Days","₹64,230","bg-warning"],["16 - 30 Days","₹52,680","bg-success"],["31 - 60 Days","₹32,140","bg-destructive"],["> 60 Days","₹20,280","bg-chart-4"]].map(x=><div className="grid grid-cols-[10px_1fr_auto] items-center gap-2" key={x[0]}><span className={`h-2 w-2 rounded-full ${x[2]}`}/><span>{x[0]}</span><b>{x[1]}</b></div>)}</div></div></article>
          <article className="dashboard-panel"><PanelTitle action={<Button variant="outline" size="sm">Last 6 Months <ChevronDown/></Button>}>Due Amount Trend</PanelTitle><div className="relative h-44 p-4"><div className="absolute inset-x-5 bottom-8 top-5 flex flex-col justify-between text-[9px] text-muted-foreground"><span>₹4L</span><span>₹3L</span><span>₹2L</span><span>₹1L</span><span>₹0</span></div><svg viewBox="0 0 600 180" className="h-full w-full overflow-visible text-primary" aria-label="Due trend chart"><g className="text-border">{[20,55,90,125,160].map(y=><line key={y} x1="35" y1={y} x2="590" y2={y} stroke="currentColor"/>)}</g><path d="M35 145 C90 136 100 112 145 98 S205 70 250 82 S330 105 370 88 S430 70 470 78 S530 92 590 68" fill="none" stroke="currentColor" strokeWidth="3"/><path d="M35 145 C90 136 100 112 145 98 S205 70 250 82 S330 105 370 88 S430 70 470 78 S530 92 590 68 L590 160 L35 160Z" fill="currentColor" opacity=".08"/>{[35,145,250,370,470,590].map((x,i)=><circle key={x} cx={x} cy={[145,98,82,88,78,68][i]} r="4" fill="currentColor"/>)}</svg><div className="absolute bottom-2 left-12 right-3 flex justify-around text-[9px] text-muted-foreground"><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span></div></div></article>
          <article className="dashboard-panel"><PanelTitle>Quick Actions</PanelTitle><div className="divide-y divide-border px-4">{quickActions.map(({ icon: Icon, title, detail },i)=><Button key={title} variant="ghost" onClick={()=>alert(`${title} selected`)} className="h-[54px] w-full justify-start px-0 text-left"><span className={`grid h-9 w-9 place-items-center rounded-md ${tones[i] ?? "bg-accent text-primary"}`}><Icon/></span><span><b className="block text-[11px]">{title}</b><small className="text-[9px] font-normal text-muted-foreground">{detail}</small></span></Button>)}</div></article>
        </section>

        <section className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1fr)_310px]">
          <div className="min-w-0 space-y-3">
            <article className="dashboard-panel overflow-hidden"><div className="flex flex-wrap items-center gap-2 border-b border-border p-3"><h2 className="mr-auto text-sm font-bold">Customers with Due</h2><Button variant="outline" size="sm" onClick={cycleSegment}>{segment}<ChevronDown/></Button><Button variant="outline" size="sm" onClick={cycleGroup}>{group}<ChevronDown/></Button><div className="relative w-60"><Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground"/><Input value={query} onChange={e=>setQuery(e.target.value)} className="h-8 pl-9 text-xs" placeholder="Search customer..."/></div><Button variant="outline" size="icon" className="h-8 w-8"><Filter/></Button></div>
              <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-[10px]"><thead className="bg-background text-muted-foreground"><tr>{["","Customer","Phone","Khata No.","Total Due","Last Purchase","Days Pending","Status","Action",""].map((h,i)=><th className="px-3 py-2 font-semibold" key={`${h}-${i}`}>{h || (i===0?<Checkbox/>:"")}</th>)}</tr></thead><tbody>{filtered.map((c)=>{const actual=customers.indexOf(c); return <tr key={c[3]} onClick={()=>setSelected(actual)} className={`cursor-pointer border-t border-border ${actual===selected ? "bg-accent/60" : "hover:bg-muted/50"}`}><td className="px-3 py-2"><Checkbox checked={actual===selected}/></td><td className="px-3 py-2"><div className="flex items-center gap-2"><InitialAvatar name={c[0]}/><span><b className="block">{c[0]}</b><small className="text-primary">{c[1]}</small></span></div></td><td className="px-3 py-2 text-muted-foreground">{c[2]}</td><td className="px-3 py-2 text-primary">{c[3]}</td><td className="px-3 py-2 font-bold">{c[4]}</td><td className="px-3 py-2 text-muted-foreground">{c[5]}</td><td className={`px-3 py-2 ${c[6]>15?"text-destructive":"text-warning"}`}>{c[6]} days</td><td className="px-3 py-2"><span className={`rounded-full px-2 py-1 font-semibold ${c[6]>15?"bg-danger-soft text-destructive":"bg-warning-soft text-warning"}`}>{c[6]>15?"Overdue":"Due Soon"}</span></td><td className="px-3 py-2"><Button variant="outline" size="sm" className="h-6 text-[9px]" onClick={()=>setSelected(actual)}>View</Button></td><td><MoreHorizontal className="h-4 w-4 text-primary"/></td></tr>})}</tbody></table></div>
              <div className="flex items-center justify-between border-t border-border px-4 py-2 text-[10px] text-muted-foreground"><span>Showing 1–{filtered.length} of 342 customers with due</span><div className="flex items-center gap-1"><Button variant="ghost" size="icon" className="h-7 w-7"><ChevronLeft/></Button>{[1,2,3,4,5].map(n=><Button key={n} variant={n===1?"default":"ghost"} size="icon" className="h-7 w-7">{n}</Button>)}<span>… 35</span><Button variant="ghost" size="icon" className="h-7 w-7"><ChevronRight/></Button></div><Button variant="outline" size="sm">10 / page <ChevronDown/></Button></div>
            </article>
            <div className="grid gap-3 md:grid-cols-[1.2fr_.9fr]"><article className="dashboard-panel overflow-hidden"><PanelTitle action={<Button variant="link" size="sm">View All</Button>}>Recent Payments</PanelTitle><table className="w-full text-left text-[9px]"><thead className="bg-background text-muted-foreground"><tr>{["Date","Customer","Method","Amount","Received By"].map(h=><th className="px-3 py-1" key={h}>{h}</th>)}</tr></thead><tbody>{[["26 Aug 2024","Priya Sharma","UPI","₹2,500","Ramesh"],["25 Aug 2024","Rakesh Patel","Cash","₹1,200","Ramesh"],["24 Aug 2024","Neha Jain","Card","₹3,000","Suresh"],["24 Aug 2024","Ali Khan","UPI","₹1,800","Ramesh"]].map((r, rowIndex)=><tr className="border-t border-border" key={`payment-${rowIndex}`}>{r.map((x,i)=><td className={`px-3 py-1 ${i===3?"font-bold":""}`} key={`${x}-${i}`}>{x}</td>)}</tr>)}</tbody></table></article><article className="dashboard-panel"><PanelTitle action={<Button variant="link" size="sm">View All</Button>}>Top Due Customers</PanelTitle><div className="px-3">{customers.slice(6,10).map(c=><div className="flex items-center gap-2 border-b border-border py-1 text-[9px]" key={c[0]}><InitialAvatar name={c[0]}/><span>{c[0]}</span><b className="ml-auto">{c[4]}</b><span className="w-12 text-right text-muted-foreground">{c[6]} days</span></div>)}</div></article></div>
          </div>

          <aside className="space-y-3"><article className="dashboard-panel overflow-hidden"><PanelTitle>Customer Khata Details</PanelTitle><div className="p-4"><div className="flex items-start gap-3"><InitialAvatar name={customer[0]} large/><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><b>{customer[0]}</b><span className="rounded bg-accent px-1 text-[9px] text-primary">{customer[1]}</span></div><div className="mt-1 space-y-1 text-[9px] text-muted-foreground"><p>↘ {customer[2]}</p><p>⌖ Indiranagar, Ahmedabad</p><p>▣ Khata No: {customer[3]}</p><p>▦ Since: 12 Jan 2023</p></div></div><Button variant="outline" size="sm" onClick={()=>alert("Customer editor opened")}>Edit</Button></div></div><div className="grid grid-cols-3 border-y border-border">{[["Total Due",customer[4]],["Last Purchase","18 Aug 2024"],["Avg. Order Value","₹2,850"]].map(x=><div className="border-r border-border p-3 last:border-0" key={x[0]}><span className="block text-[8px] text-muted-foreground">{x[0]}</span><b className="text-[11px]">{x[1]}</b></div>)}</div><div className="flex border-b border-border">{["Khata History","Due Summary","Notes"].map(t=><Button key={t} variant="ghost" onClick={()=>setTab(t)} className={`h-9 flex-1 rounded-none px-1 text-[9px] ${tab===t?"border-b-2 border-primary text-primary":""}`}>{t}</Button>)}</div>{tab === "Khata History" ? <><table className="w-full text-left text-[8px]"><thead className="bg-background text-muted-foreground"><tr>{["Date","Particulars","Amount","Balance"].map(h=><th className="px-2 py-2" key={h}>{h}</th>)}</tr></thead><tbody>{[["18 Aug 2024","Sale (POS-001245)","+₹2,850","₹12,480"],["05 Aug 2024","Sale (POS-001230)","+₹2,200","₹9,630"],["21 Jul 2024","Payment (Cash)","-₹1,000","₹6,430"],["10 Jul 2024","Sale (POS-001198)","+₹4,100","₹7,430"],["28 Jun 2024","Payment (Card)","-₹2,000","₹3,330"]].map(r=><tr className="border-t border-border" key={r[0]}>{r.map((x,i)=><td className={`px-2 py-2 ${i===2?(x.startsWith("-")?"text-success":"text-destructive"):""}`} key={x}>{x}</td>)}</tr>)}</tbody></table><Button variant="link" className="w-full justify-end text-[9px]">View Full Khata History <ChevronRight/></Button></> : <div className="grid h-44 place-items-center px-8 text-center text-xs text-muted-foreground">{tab} for {customer[0]} is ready for review.</div>}</article>
            <article className="dashboard-panel flex items-center gap-3 bg-accent p-4"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-panel text-primary"><CalendarDays/></div><div><b className="text-xs">Send Due Reminders</b><p className="my-1 text-[9px] text-muted-foreground">Automatically remind customers about pending dues via WhatsApp, SMS or Call.</p><Button size="sm" onClick={()=>alert(`Reminder sent to ${customer[0]}`)}>Send Reminders</Button></div></article>
          </aside>
        </section>
      </div>
    </main>
  </div>;
}
