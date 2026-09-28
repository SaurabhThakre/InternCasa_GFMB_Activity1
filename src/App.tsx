import { useEffect, useState, type ReactNode } from "react";

type StudentScreen =
  | "entry"
  | "onboarding-1"
  | "onboarding-2"
  | "onboarding-3"
  | "readiness"
  | "discover"
  | "detail"
  | "processing"
  | "fit"
  | "targets"
  | "preparation"
  | "submitted"
  | "applications"
  | "interview"
  | "offer";

type OrgScreen =
  | "setup"
  | "create"
  | "readiness"
  | "published"
  | "applicants"
  | "candidate"
  | "shortlisted"
  | "filled";

const internships = [
  {
    title: "Product Management Intern",
    company: "Nova Labs",
    location: "Bengaluru",
    duration: "10 weeks",
    deadline: "Oct 20, 2026",
    description: "Support product research, roadmap planning, and user analysis.",
    requirements: ["SQL", "Analytics", "Product thinking", "Stakeholder communication"],
    recommended: true,
  },
  {
    title: "Marketing Intern",
    company: "Orbit Foods",
    location: "Mumbai",
    duration: "8 weeks",
    deadline: "Oct 25, 2026",
    description: "Assist with campaign planning and digital marketing.",
    requirements: ["Market research", "Communication", "Campaign planning", "Excel"],
  },
  {
    title: "Data Analytics Intern",
    company: "FinEdge",
    location: "Bengaluru",
    duration: "12 weeks",
    deadline: "Oct 18, 2026",
    description: "Analyze product and user data to generate insights.",
    requirements: ["SQL", "Excel", "Python", "Data analysis"],
  },
  {
    title: "Strategy Intern",
    company: "GreenGrid",
    location: "Hyderabad",
    duration: "10 weeks",
    deadline: "Nov 1, 2026",
    description: "Support market analysis and strategic initiatives.",
    requirements: ["Market research", "Structured thinking", "Excel", "Communication"],
  },
];

const applicants = [
  { name: "Rohan Mehta", education: "MBA, IIM Bangalore, Final year", skills: "SQL, Python, Market research", fit: "Strong fit" },
  { name: "Priya Sharma", education: "MBA, ISB Hyderabad, Final year", skills: "Analytics, Strategy, Excel", fit: "Good fit" },
  { name: "Arun Kumar", education: "MBA, XLRI, Second year", skills: "Product thinking, Communication, Research", fit: "Moderate fit" },
];

function Action({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "quiet";
  disabled?: boolean;
  className?: string;
}) {
  const variants = {
    primary: "bg-slate-900 text-white border-slate-900 hover:bg-slate-700",
    secondary: "bg-white text-slate-900 border-slate-300 hover:bg-slate-50",
    quiet: "bg-transparent text-slate-600 border-transparent hover:text-slate-950 hover:bg-slate-100",
  };
  const activate = () => !disabled && onClick?.();
  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={activate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") activate();
      }}
      className={`inline-flex min-h-10 select-none items-center justify-center rounded-lg border px-4 py-2 text-sm font-semibold transition ${variants[variant]} ${
        disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "good" | "warn" }) {
  const tones = {
    neutral: "bg-slate-100 text-slate-700",
    good: "bg-emerald-50 text-emerald-700",
    warn: "bg-amber-50 text-amber-700",
  };
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

function Progress({ value }: { value: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
      <div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}

function PageTitle({ eyebrow, title, copy }: { eyebrow?: string; title: string; copy?: string }) {
  return (
    <div className="mb-8 max-w-2xl">
      {eyebrow && <div className="mb-2 text-xs font-bold uppercase tracking-widest text-indigo-600">{eyebrow}</div>}
      <div className="text-3xl font-bold tracking-tight text-slate-950">{title}</div>
      {copy && <div className="mt-3 text-base leading-7 text-slate-600">{copy}</div>}
    </div>
  );
}

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-slate-200 bg-white p-6 ${className}`}>{children}</div>;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="min-h-11 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">{value}</div>
    </div>
  );
}

function StepHeader({ step }: { step: number }) {
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="font-semibold text-slate-900">Build your profile</span>
        <span className="text-slate-500">Step {step} of 3</span>
      </div>
      <Progress value={(step / 3) * 100} />
    </div>
  );
}

function EmptyState({ title, copy, action, onClick }: { title: string; copy: string; action: string; onClick: () => void }) {
  return (
    <Panel className="py-16 text-center">
      <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-500">—</div>
      <div className="text-xl font-bold text-slate-950">{title}</div>
      <div className="mx-auto mt-2 mb-6 max-w-md text-sm leading-6 text-slate-600">{copy}</div>
      <Action onClick={onClick}>{action}</Action>
    </Panel>
  );
}

function Pipeline({ status }: { status: "Applied" | "Interview" | "Offer" }) {
  const stages = ["Saved", "Prepared", "Applied", "Interview", "Offer"];
  const active = status === "Offer" ? 4 : status === "Interview" ? 3 : 2;
  return (
    <div className="mt-7 grid grid-cols-5 gap-2">
      {stages.map((stage, index) => (
        <div key={stage}>
          <div className={`mb-2 h-2 rounded-full ${index <= active ? "bg-indigo-600" : "bg-slate-200"}`} />
          <div className={`text-xs font-semibold ${index <= active ? "text-slate-900" : "text-slate-400"}`}>{stage}</div>
        </div>
      ))}
    </div>
  );
}

function StudentHeader({
  active,
  saved,
  onNavigate,
}: {
  active: string;
  saved: boolean;
  onNavigate: (screen: StudentScreen) => void;
}) {
  const links: { label: string; screen: StudentScreen }[] = [
    { label: "Discover", screen: "discover" },
    { label: `My Targets${saved ? " · 1" : ""}`, screen: "targets" },
    { label: "Applications", screen: "applications" },
  ];
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-8 px-5 py-4">
        <div className="mr-auto text-lg font-extrabold tracking-tight text-slate-950">Intern Casa</div>
        <div className="hidden items-center gap-2 sm:flex">
          {links.map((link) => (
            <Action
              key={link.label}
              variant="quiet"
              onClick={() => onNavigate(link.screen)}
              className={active === link.screen ? "bg-slate-100 text-slate-950" : ""}
            >
              {link.label}
            </Action>
          ))}
        </div>
        <div className="flex size-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">AR</div>
      </div>
    </div>
  );
}

function InternshipCard({ item, onOpen }: { item: (typeof internships)[number]; onOpen?: () => void }) {
  return (
    <Panel className="flex h-full flex-col">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-bold text-slate-950">{item.title}</div>
          <div className="mt-1 text-sm font-medium text-slate-500">{item.company}</div>
        </div>
        {item.recommended && <Badge tone="good">Recommended</Badge>}
      </div>
      <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600">
        <span>{item.location}</span><span>{item.duration}</span><span>Due {item.deadline}</span>
      </div>
      <div className="mb-6 text-sm leading-6 text-slate-600">{item.description}</div>
      <div className="mt-auto">
        <Action variant={item.recommended ? "primary" : "secondary"} onClick={onOpen} disabled={!onOpen} className="w-full">
          {item.recommended ? "Assess My Fit" : "View Role"}
        </Action>
      </div>
    </Panel>
  );
}

function OrgHeader({ onExit }: { onExit: () => void }) {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <div>
          <div className="text-lg font-extrabold tracking-tight">Intern Casa</div>
          <div className="text-xs text-slate-500">Organization workspace</div>
        </div>
        <Action variant="quiet" onClick={onExit}>Exit</Action>
      </div>
    </div>
  );
}

export default function App() {
  const [studentScreen, setStudentScreen] = useState<StudentScreen>("entry");
  const [orgScreen, setOrgScreen] = useState<OrgScreen | null>(null);
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<"Applied" | "Interview" | "Offer">("Applied");
  const [tasks, setTasks] = useState([false, false, false]);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    if (studentScreen !== "processing") return;
    const timer = window.setTimeout(() => setStudentScreen("fit"), 1700);
    return () => window.clearTimeout(timer);
  }, [studentScreen]);

  const reset = () => {
    setStudentScreen("entry");
    setOrgScreen(null);
    setSaved(false);
    setApplied(false);
    setApplicationStatus("Applied");
    setTasks([false, false, false]);
  };

  if (orgScreen) {
    const next: Record<OrgScreen, OrgScreen | null> = {
      setup: "create", create: "readiness", readiness: "published", published: "applicants",
      applicants: "candidate", candidate: "shortlisted", shortlisted: "filled", filled: null,
    };
    const orgCopy: Record<OrgScreen, { eyebrow: string; title: string; copy: string; action: string }> = {
      setup: { eyebrow: "Step 1", title: "Set up your organization", copy: "Tell candidates who is hiring and what success looks like.", action: "Continue" },
      create: { eyebrow: "Step 2", title: "Create an internship", copy: "Start with a clear, focused opportunity.", action: "Continue" },
      readiness: { eyebrow: "Step 3", title: "Listing readiness", copy: "Review the essentials before students discover the role.", action: "Publish Internship" },
      published: { eyebrow: "Published", title: "Your listing is live", copy: "Students can now discover and assess the Product Management Intern opportunity.", action: "Review Applicants" },
      applicants: { eyebrow: "3 applicants", title: "Review applicants", copy: "Prioritize candidates based on relevant evidence and role fit.", action: "View Rohan" },
      candidate: { eyebrow: "Candidate detail", title: "Rohan Mehta", copy: "A strong early-career candidate with analytical and research evidence.", action: "Shortlist for Interview" },
      shortlisted: { eyebrow: "Shortlisted", title: "Rohan is moving forward", copy: "The candidate is ready for interview preparation and scheduling.", action: "Mark Position Filled" },
      filled: { eyebrow: "Hiring complete", title: "Position filled", copy: "Rohan Mehta selected for Product Management Intern at Nova Labs. The listing is now closed.", action: "Return to Entry" },
    };
    const content = orgCopy[orgScreen];
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <OrgHeader onExit={reset} />
        <main className="mx-auto max-w-4xl px-5 py-12">
          <PageTitle eyebrow={content.eyebrow} title={content.title} copy={content.copy} />
          {orgScreen === "setup" && (
            <Panel className="grid gap-5 sm:grid-cols-2">
              <Field label="Organization" value="Nova Labs" /><Field label="Contact" value="Maya Kapoor" />
              <Field label="Role" value="Product Lead" /><Field label="Hiring goal" value="Find one product intern" />
            </Panel>
          )}
          {orgScreen === "create" && (
            <Panel className="grid gap-5 sm:grid-cols-2">
              <Field label="Title" value="Product Management Intern" /><Field label="Company" value="Nova Labs" />
              <Field label="Location" value="Bengaluru" /><Field label="Duration" value="10 weeks" />
              <Field label="Deadline" value="Oct 20, 2026" /><Field label="Requirements" value="SQL, Analytics, Product thinking, Stakeholder communication" />
              <div className="sm:col-span-2"><Field label="Description" value={internships[0].description} /></div>
            </Panel>
          )}
          {orgScreen === "readiness" && (
            <Panel>
              <div className="mb-5 flex items-end justify-between"><div className="text-lg font-bold">Ready to publish</div><div className="text-2xl font-bold">100%</div></div>
              <Progress value={100} />
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {["Role clarity", "Requirements", "Timeline", "Candidate expectations"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg bg-emerald-50 p-4 text-sm font-semibold text-emerald-800"><span>✓</span>{item}</div>
                ))}
              </div>
            </Panel>
          )}
          {orgScreen === "published" && (
            <Panel><Badge tone="good">Listing published</Badge><div className="mt-4 text-xl font-bold">Product Management Intern</div><div className="mt-1 text-slate-500">Nova Labs · Bengaluru</div></Panel>
          )}
          {orgScreen === "applicants" && (
            <div className="space-y-3">
              {applicants.map((person, index) => (
                <Panel key={person.name} className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex-1"><div className="font-bold">{person.name}</div><div className="mt-1 text-sm text-slate-500">{person.education}</div><div className="mt-2 text-sm text-slate-700">{person.skills}</div></div>
                  <div className="flex items-center gap-3"><Badge tone={index === 0 ? "good" : "neutral"}>{person.fit}</Badge><Badge>New</Badge></div>
                </Panel>
              ))}
            </div>
          )}
          {orgScreen === "candidate" && (
            <div className="grid gap-5 md:grid-cols-2">
              <Panel><div className="mb-4 font-bold">Candidate profile</div><div className="space-y-4"><Field label="Education" value={applicants[0].education} /><Field label="Skills" value={applicants[0].skills} /><Field label="Relevant evidence" value="Analytics coursework and structured market-research project" /></div></Panel>
              <Panel><Badge tone="good">Strong fit</Badge><div className="mt-5 font-bold">Fit summary</div><div className="mt-2 text-sm leading-6 text-slate-600">Strong analytical foundation and relevant research experience.</div><div className="mt-5 font-bold">Development consideration</div><div className="mt-2 text-sm leading-6 text-slate-600">Explore direct product delivery experience during the interview.</div></Panel>
            </div>
          )}
          {orgScreen === "shortlisted" && (
            <Panel><div className="flex items-center justify-between"><div><div className="font-bold">Rohan Mehta</div><div className="mt-1 text-sm text-slate-500">Prepare product-case and stakeholder interview prompts.</div></div><Badge tone="good">Interview</Badge></div></Panel>
          )}
          {orgScreen === "filled" && (
            <Panel><Badge tone="good">Listing closed</Badge><div className="mt-5 text-xl font-bold">Rohan Mehta selected</div><div className="mt-2 text-slate-500">Product Management Intern — Nova Labs</div></Panel>
          )}
          <div className="mt-7"><Action onClick={() => next[orgScreen] ? setOrgScreen(next[orgScreen]) : reset()}>{content.action}</Action></div>
        </main>
      </div>
    );
  }

  if (studentScreen === "entry") {
    return (
      <div className="min-h-screen bg-slate-50 px-5 py-16 text-slate-900">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <div className="mb-3 text-sm font-extrabold uppercase tracking-widest text-indigo-600">Intern Casa</div>
            <div className="text-4xl font-bold tracking-tight">Why are you here?</div>
            <div className="mt-3 text-slate-600">Choose a journey to explore the prototype.</div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Panel className="flex flex-col">
              <div className="mb-5 flex size-11 items-center justify-center rounded-lg bg-indigo-50 font-bold text-indigo-700">S</div>
              <div className="text-xl font-bold">I’m a Student</div><div className="mt-2 mb-8 text-slate-600">Find and apply for internships</div>
              <Action onClick={() => setStudentScreen("onboarding-1")} className="mt-auto w-full">Start Student Journey</Action>
            </Panel>
            <Panel className="flex flex-col">
              <div className="mb-5 flex size-11 items-center justify-center rounded-lg bg-slate-100 font-bold text-slate-700">O</div>
              <div className="text-xl font-bold">I’m an Organization</div><div className="mt-2 mb-8 text-slate-600">Post an internship and find candidates</div>
              <Action variant="secondary" onClick={() => setOrgScreen("setup")} className="mt-auto w-full">Start Organization Journey</Action>
            </Panel>
          </div>
        </div>
      </div>
    );
  }

  const onboarding = studentScreen.startsWith("onboarding");
  const navActive = ["detail", "processing", "fit", "readiness"].includes(studentScreen) ? "discover" : studentScreen === "preparation" ? "targets" : studentScreen === "submitted" || studentScreen === "interview" || studentScreen === "offer" ? "applications" : studentScreen;
  const completedTasks = tasks.filter(Boolean).length;
  const readiness = [72, 77, 82, 86][completedTasks];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {!onboarding && <StudentHeader active={navActive} saved={saved} onNavigate={setStudentScreen} />}
      <main className={`mx-auto px-5 py-10 ${onboarding ? "max-w-3xl" : "max-w-6xl"}`}>
        {onboarding && (
          <>
            <StepHeader step={studentScreen === "onboarding-1" ? 1 : studentScreen === "onboarding-2" ? 2 : 3} />
            <Panel>
              {studentScreen === "onboarding-1" && (
                <><PageTitle eyebrow="About you" title="Start with the basics" copy="These details help us prioritize relevant internships." /><div className="grid gap-5 sm:grid-cols-2"><Field label="Program / Education" value="MBA, Final Year" /><Field label="Preferred role types" value="Product management, Analytics, Strategy" /><Field label="Preferred location" value="Bengaluru or Remote" /><Field label="Internship duration" value="8–12 weeks" /></div><div className="mt-8 flex justify-end"><Action onClick={() => setStudentScreen("onboarding-2")}>Next</Action></div></>
              )}
              {studentScreen === "onboarding-2" && (
                <><PageTitle eyebrow="Your evidence" title="Show what you can do" copy="Add evidence we can compare with role requirements." /><div className="space-y-5"><Field label="Skills" value="SQL, Excel, Python, market research, presentation" /><Field label="Projects" value="Analytics course project, Student consulting project" /><Field label="Experience" value="College club leadership in strategic communications" /></div><div className="mt-8 flex justify-between"><Action variant="secondary" onClick={() => setStudentScreen("onboarding-1")}>Back</Action><Action onClick={() => setStudentScreen("onboarding-3")}>Next</Action></div></>
              )}
              {studentScreen === "onboarding-3" && (
                <><PageTitle eyebrow="What you want" title="Set your direction" copy="We’ll use these goals to shape your recommendations." /><div className="space-y-5"><Field label="Career interests" value="Product management, Growth strategy" /><Field label="Internship type" value="Summer internship, pre-placement opportunity preferred" /></div><div className="mt-8 flex justify-between"><Action variant="secondary" onClick={() => setStudentScreen("onboarding-2")}>Back</Action><Action onClick={() => setStudentScreen("readiness")}>Complete Profile</Action></div></>
              )}
            </Panel>
          </>
        )}

        {studentScreen === "readiness" && (
          <><PageTitle eyebrow="Profile complete" title="You’re ready for initial recommendations" copy="Your profile has enough evidence to begin comparing opportunities." /><div className="grid gap-5 md:grid-cols-3"><Panel className="md:col-span-2"><div className="flex items-start justify-between"><div><div className="text-xl font-bold">Ananya Rao</div><div className="mt-1 text-sm text-slate-500">Final-year MBA student</div></div><div className="text-3xl font-bold">70%</div></div><div className="my-6"><Progress value={70} /></div><div className="flex flex-wrap gap-2">{["SQL", "Excel", "Python", "Market research", "Presentation"].map((skill) => <Badge key={skill}>{skill}</Badge>)}</div></Panel><Panel><div className="font-bold">Improve over time</div><div className="mt-3 text-sm leading-6 text-slate-600">Add stronger project evidence later to increase the quality of your fit results.</div></Panel></div><div className="mt-7"><Action onClick={() => setStudentScreen("discover")}>See My Matches</Action></div></>
        )}

        {studentScreen === "discover" && (
          <><PageTitle eyebrow="Discover" title="Recommended internships" copy="Roles selected from Ananya’s interests, skills, and location preferences." /><div className="grid gap-5 md:grid-cols-2">{internships.map((item, index) => <InternshipCard key={item.title} item={item} onOpen={index === 0 ? () => setStudentScreen("detail") : undefined} />)}</div></>
        )}

        {studentScreen === "detail" && (
          <><Action variant="quiet" onClick={() => setStudentScreen("discover")} className="mb-6">← Back to Discover</Action><Panel><div className="flex flex-col gap-8 md:flex-row md:items-start"><div className="flex-1"><Badge tone="good">Recommended</Badge><div className="mt-5 text-3xl font-bold">{internships[0].title}</div><div className="mt-2 text-lg text-slate-500">{internships[0].company}</div><div className="mt-7 text-base leading-7 text-slate-600">{internships[0].description}</div><div className="mt-7 flex flex-wrap gap-2">{internships[0].requirements.map((item) => <Badge key={item}>{item}</Badge>)}</div></div><div className="w-full rounded-xl bg-slate-50 p-5 md:w-72"><div className="space-y-4 text-sm"><div><div className="text-slate-500">Location</div><div className="font-semibold">{internships[0].location}</div></div><div><div className="text-slate-500">Duration</div><div className="font-semibold">{internships[0].duration}</div></div><div><div className="text-slate-500">Deadline</div><div className="font-semibold">{internships[0].deadline}</div></div></div><Action onClick={() => setStudentScreen("processing")} className="mt-6 w-full">Assess My Fit</Action></div></div></Panel></>
        )}

        {studentScreen === "processing" && (
          <div className="flex min-h-96 flex-col items-center justify-center text-center"><div className="mb-6 size-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" /><div className="text-xl font-bold">Analysing your profile against this role…</div><div className="mt-2 text-sm text-slate-500">Comparing skills, evidence, and preferences.</div></div>
        )}

        {studentScreen === "fit" && (
          <><PageTitle eyebrow="Fit result" title="Strong potential fit" copy="Your evidence aligns well with the analytical foundation of this role." /><div className="grid gap-5 lg:grid-cols-3"><Panel className="lg:col-span-2"><div className="flex items-end justify-between"><div className="font-bold">Fit readiness</div><div className="text-3xl font-bold">72%</div></div><div className="my-5"><Progress value={72} /></div><div className="mt-7 font-bold">Your strengths</div><div className="mt-3 space-y-3">{["SQL and analytics skills directly match core role requirements", "Product coursework demonstrates relevant domain knowledge", "Consulting project provides evidence of structured thinking"].map((text) => <div key={text} className="flex gap-3 text-sm text-slate-700"><span className="font-bold text-emerald-600">✓</span>{text}</div>)}</div></Panel><Panel><Badge tone="warn">One gap</Badge><div className="mt-4 font-bold">Stakeholder experience</div><div className="mt-2 text-sm leading-6 text-slate-600">Limited direct evidence of stakeholder-management experience.</div><div className="mt-5 rounded-lg bg-indigo-50 p-4 text-sm leading-6 text-indigo-900">Your consulting project can partially support this gap through cross-functional coordination.</div></Panel></div><Panel className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center"><div className="flex-1"><div className="font-bold">Recommended next action</div><div className="mt-1 text-sm text-slate-600">Add one concrete stakeholder example before applying.</div></div><div className="flex gap-3"><Action variant="secondary" onClick={() => setStudentScreen("discover")}>Explore Another Role</Action><Action onClick={() => { setSaved(true); setSavedNotice(true); window.setTimeout(() => { setSavedNotice(false); setStudentScreen("targets"); }, 700); }}>{saved ? "Saved" : savedNotice ? "Saving…" : "Save to My Targets"}</Action></div></Panel></>
        )}

        {studentScreen === "targets" && (
          <><PageTitle eyebrow="My Targets" title={saved ? "Your saved opportunities" : "Build your target list"} copy={saved ? "Focus your preparation on roles with the strongest potential." : "Save promising roles to prepare with intention."} />{!saved ? <EmptyState title="No saved targets yet" copy="Explore recommended internships and save one to begin a focused preparation plan." action="Discover Internships" onClick={() => setStudentScreen("discover")} /> : <Panel><div className="flex flex-col gap-6 md:flex-row md:items-center"><div className="flex-1"><Badge tone="good">72% fit readiness</Badge><div className="mt-4 text-xl font-bold">Product Management Intern</div><div className="mt-1 text-slate-500">Nova Labs · Bengaluru · 10 weeks · Due Oct 20</div><div className="mt-4 text-sm leading-6 text-slate-600">Strong analytical foundation. Add stakeholder evidence before applying.</div></div><Action onClick={() => setStudentScreen("preparation")}>Open Preparation Plan</Action></div></Panel>}</>
        )}

        {studentScreen === "preparation" && (
          <><PageTitle eyebrow="Preparation plan" title="Close the gaps before you apply" copy="Product Management Intern at Nova Labs" /><div className="grid gap-5 lg:grid-cols-3"><Panel className="lg:col-span-2"><div className="mb-5 font-bold">Confirmed evidence</div>{["SQL evidence — confirmed in profile", "Analytics project — confirmed in profile"].map((item) => <div key={item} className="mb-3 flex gap-3 rounded-lg bg-emerald-50 p-4 text-sm font-semibold text-emerald-800"><span>✓</span>{item}</div>)}<div className="mt-7 mb-4 font-bold">Preparation checklist</div>{["Add stakeholder-management example", "Review product-case interview basics", "Tailor CV evidence for the role"].map((item, index) => <div key={item} role="checkbox" aria-checked={tasks[index]} tabIndex={0} onClick={() => setTasks((current) => current.map((value, i) => i === index ? !value : value))} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setTasks((current) => current.map((value, i) => i === index ? !value : value)); }} className="mb-3 flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-4 text-sm font-semibold hover:bg-slate-50"><span className={`flex size-5 items-center justify-center rounded border ${tasks[index] ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-300 bg-white"}`}>{tasks[index] ? "✓" : ""}</span>{item}</div>)}</Panel><Panel><div className="flex items-end justify-between"><div className="font-bold">Fit readiness</div><div className="text-3xl font-bold">{readiness}%</div></div><div className="my-5"><Progress value={readiness} /></div><div className="text-sm leading-6 text-slate-600">{completedTasks === 3 ? "Key gaps addressed. You’re ready to submit." : `${3 - completedTasks} preparation task${3 - completedTasks === 1 ? "" : "s"} remaining.`}</div>{completedTasks === 3 && <div className="mt-4"><Badge tone="good">Ready to Apply</Badge></div>}<Action disabled={completedTasks < 3} onClick={() => { setApplied(true); setStudentScreen("submitted"); }} className="mt-6 w-full">Apply Now</Action></Panel></div></>
        )}

        {studentScreen === "submitted" && (
          <div className="mx-auto max-w-2xl"><Panel className="py-10 text-center"><div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-emerald-100 text-xl font-bold text-emerald-700">✓</div><Badge tone="good">Status: Submitted</Badge><div className="mt-5 text-3xl font-bold">Application submitted</div><div className="mt-3 text-slate-600">Product Management Intern — Nova Labs</div><div className="mt-1 text-sm text-slate-500">{new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div><div className="mt-7 rounded-lg bg-slate-50 p-4 text-left text-sm leading-6 text-slate-600"><span className="font-bold text-slate-900">Next task:</span> Prepare one concise stakeholder communication example before the interview stage.</div><Action onClick={() => setStudentScreen("applications")} className="mt-7">View Applications</Action></Panel></div>
        )}

        {studentScreen === "applications" && (
          <><PageTitle eyebrow="Applications" title="Track your progress" copy="Follow each application from submission to outcome." />{!applied ? <EmptyState title="No applications yet" copy="Complete the preparation plan for a saved target to unlock Apply." action="Go to My Targets" onClick={() => setStudentScreen("targets")} /> : <Panel><div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"><div><div className="text-xl font-bold">Product Management Intern</div><div className="mt-1 text-slate-500">Nova Labs · Applied today</div></div><Badge tone="good">{applicationStatus}</Badge></div><Pipeline status={applicationStatus} />{applicationStatus === "Applied" && <div className="mt-8 border-t border-slate-100 pt-6"><Action onClick={() => setApplicationStatus("Interview")}>Advance to Interview</Action></div>}{applicationStatus === "Interview" && <div className="mt-8 border-t border-slate-100 pt-6"><div className="mb-4 text-sm text-slate-600">Interview preparation is now unlocked.</div><Action onClick={() => setStudentScreen("interview")}>Open Interview Challenge</Action></div>}{applicationStatus === "Offer" && <div className="mt-8 border-t border-slate-100 pt-6"><Action onClick={() => setStudentScreen("offer")}>View Offer Milestone</Action></div>}</Panel>}</>
        )}

        {studentScreen === "interview" && (
          <><PageTitle eyebrow="Current challenge · Interview tomorrow" title="Nova Labs Product Interview" copy="Your preparation has led to this moment. Bring your strongest evidence into the conversation." /><div className="grid gap-5 md:grid-cols-2"><Panel><div className="font-bold">Preparation completed</div><div className="mt-5 space-y-3">{["Role-fit story", "Product-case review", "Stakeholder example", "Application progress"].map((item) => <div key={item} className="flex gap-3 text-sm text-slate-700"><span className="font-bold text-emerald-600">✓</span>{item}</div>)}</div></Panel><Panel><Badge tone="warn">Boss fight</Badge><div className="mt-5 text-xl font-bold">Tell a clear story</div><div className="mt-2 text-sm leading-6 text-slate-600">Connect your analytics evidence, product interest, and stakeholder example to Nova Labs’ needs.</div><Action onClick={() => { setApplicationStatus("Offer"); setStudentScreen("offer"); }} className="mt-6 w-full">Ready for Interview</Action></Panel></div><div className="mt-6"><Action variant="secondary" onClick={() => setStudentScreen("applications")}>Back to Applications</Action></div></>
        )}

        {studentScreen === "offer" && (
          <div className="mx-auto max-w-3xl"><Panel className="py-10 text-center"><Badge tone="good">Offer milestone reached</Badge><div className="mt-5 text-3xl font-bold">Product Management Intern</div><div className="mt-2 text-lg text-slate-500">Nova Labs</div><div className="mx-auto mt-6 max-w-xl text-sm leading-6 text-slate-600">You completed your profile, assessed the role, closed preparation gaps, applied, and prepared for the interview.</div><div className="text-left"><Pipeline status="Offer" /></div><div className="mt-9 flex flex-wrap justify-center gap-3"><Action variant="secondary" onClick={() => setStudentScreen("applications")}>Return to Applications</Action><Action onClick={reset}>Restart Student Journey</Action></div></Panel></div>
        )}
      </main>
    </div>
  );
}
