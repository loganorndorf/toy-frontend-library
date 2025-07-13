<script>
	import { Button, Input, TextArea, Card, Badge, Select, Avatar, Spinner, Skeleton, Container, Stack, Grid, Navbar, Sidebar, Sheet } from '$lib/components/ui';
	import SimpleModal from '$lib/components/ui/SimpleModal.svelte';
	import { Home, Users, Settings, BarChart3, Mail, Calendar, FileText, Image, HelpCircle, LogOut, AlertTriangle, Info, CheckCircle, Trash2 } from 'lucide-svelte';

	const countryOptions = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
		{ value: 'uk', label: 'United Kingdom' },
		{ value: 'de', label: 'Germany' },
		{ value: 'fr', label: 'France' },
		{ value: 'jp', label: 'Japan' },
	];

	const priorityOptions = [
		{ value: 'low', label: 'Low Priority' },
		{ value: 'medium', label: 'Medium Priority' },
		{ value: 'high', label: 'High Priority' },
		{ value: 'urgent', label: 'Urgent', disabled: true },
	];

	let selectedCountry = $state();
	let selectedPriority = $state();

	const navItems = [
		{ label: 'Home', href: '#home', active: true },
		{ label: 'Products', href: '#products' },
		{ label: 'Services', href: '#services' },
		{ label: 'About', href: '#about' },
		{ label: 'Contact', onClick: () => alert('Contact clicked!') },
	];

	const sidebarItems = [
		{ label: 'Dashboard', href: '#dashboard', icon: Home, active: true },
		{ label: 'Analytics', href: '#analytics', icon: BarChart3 },
		{ label: 'Users', href: '#users', icon: Users },
		{ label: 'Messages', href: '#messages', icon: Mail },
		{ label: 'Calendar', href: '#calendar', icon: Calendar },
		{ label: 'Documents', href: '#documents', icon: FileText },
		{ label: 'Media', href: '#media', icon: Image },
		{ label: 'Settings', href: '#settings', icon: Settings },
		{ label: 'Help', href: '#help', icon: HelpCircle },
		{ label: 'Logout', onClick: () => alert('Logout clicked!'), icon: LogOut },
	];

	let sidebarCollapsed = $state(false);

	// Modal states
	let basicModalOpen = $state(false);
	let confirmModalOpen = $state(false);
	let formModalOpen = $state(false);
	let fullscreenModalOpen = $state(false);
	let alertModalOpen = $state(false);

	// Sheet states
	let rightSheetOpen = $state(false);
	let leftSheetOpen = $state(false);
	let topSheetOpen = $state(false);
	let bottomSheetOpen = $state(false);
	let settingsSheetOpen = $state(false);

	// Form state
	let formData = $state({
		name: '',
		email: '',
		message: ''
	});

	function handleFormSubmit() {
		alert(`Form submitted! Name: ${formData.name}, Email: ${formData.email}`);
		formModalOpen = false;
		formData = { name: '', email: '', message: '' };
	}

	function handleDeleteConfirm() {
		alert('Item deleted successfully!');
		confirmModalOpen = false;
	}
</script>

<main class="container mx-auto p-8">
	<div class="mb-8">
		<h1 class="text-4xl font-bold mb-4">Component Library Demo</h1>
		<div class="flex gap-4 text-sm">
			<a href="/charts" class="text-blue-600 hover:text-blue-800 underline">View Charts →</a>
			<a href="/dashboard" class="text-blue-600 hover:text-blue-800 underline">View Dashboard →</a>
		</div>
	</div>
	
	<section class="mb-12">
		<h2 class="text-2xl font-semibold mb-4">Buttons</h2>
		<div class="flex gap-4 flex-wrap">
			<Button>Default</Button>
			<Button variant="destructive">Destructive</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="link">Link</Button>
		</div>
		
		<div class="flex gap-4 flex-wrap mt-4">
			<Button size="sm">Small</Button>
			<Button size="default">Default</Button>
			<Button size="lg">Large</Button>
		</div>
	</section>

	<section class="mb-12">
		<h2 class="text-2xl font-semibold mb-4">Inputs</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
			<Input placeholder="Default input" />
			<Input label="With Label" placeholder="Enter text..." />
			<Input placeholder="Disabled input" disabled />
			<Input error="This field is required" placeholder="Input with error" />
			<Input label="Email" type="email" placeholder="your@email.com" />
			<Input label="Password" type="password" placeholder="Password" />
		</div>
	</section>

	<section class="mb-12">
		<h2 class="text-2xl font-semibold mb-4">TextAreas</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
			<TextArea placeholder="Default textarea" />
			<TextArea label="Message" placeholder="Enter your message..." />
			<TextArea placeholder="Disabled textarea" disabled />
			<TextArea error="Message is required" placeholder="Textarea with error" />
			<TextArea label="Description" placeholder="Describe your project..." rows="4" />
		</div>
	</section>

	<section class="mb-12">
		<h2 class="text-2xl font-semibold mb-4">Cards</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<Card>
				<div class="p-6">
					<h3 class="text-lg font-semibold mb-2">Default Card</h3>
					<p class="text-slate-600">This is a default card with some content inside it.</p>
				</div>
			</Card>
			
			<Card variant="outline">
				<div class="p-6">
					<h3 class="text-lg font-semibold mb-2">Outlined Card</h3>
					<p class="text-slate-600">This card has a more prominent border style.</p>
				</div>
			</Card>
			
			<Card variant="elevated">
				<div class="p-6">
					<h3 class="text-lg font-semibold mb-2">Elevated Card</h3>
					<p class="text-slate-600">This card has enhanced shadow for elevation.</p>
				</div>
			</Card>
		</div>
		
		<div class="mt-4">
			<Card>
				<div class="p-6">
					<h3 class="text-lg font-semibold mb-4">Card with Form Elements</h3>
					<div class="space-y-4">
						<Input label="Name" placeholder="Enter your name" />
						<TextArea label="Message" placeholder="Enter your message..." />
						<Button>Submit</Button>
					</div>
				</div>
			</Card>
		</div>
	</section>

	<section class="mb-12">
		<h2 class="text-2xl font-semibold mb-4">Badges</h2>
		<div class="flex flex-wrap gap-4 items-center">
			<Badge>Default</Badge>
			<Badge variant="secondary">Secondary</Badge>
			<Badge variant="destructive">Destructive</Badge>
			<Badge variant="outline">Outline</Badge>
			<Badge variant="success">Success</Badge>
			<Badge variant="warning">Warning</Badge>
		</div>
		
		<div class="mt-6">
			<h3 class="text-lg font-semibold mb-2">Badges in Context</h3>
			<div class="space-y-2">
				<p>Status: <Badge variant="success">Active</Badge></p>
				<p>Priority: <Badge variant="warning">High</Badge></p>
				<p>Notifications: <Badge variant="destructive">5</Badge></p>
				<p>Category: <Badge variant="outline">Design</Badge></p>
			</div>
		</div>
	</section>

	<section class="mb-12">
		<h2 class="text-2xl font-semibold mb-4">Select</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
			<Select
				options={countryOptions}
				placeholder="Choose a country..."
				label="Country"
				value={selectedCountry}
			/>
			
			<Select
				options={priorityOptions}
				placeholder="Select priority..."
				label="Priority"
				value={selectedPriority}
			/>
			
			<Select
				options={countryOptions}
				placeholder="Disabled select"
				disabled
			/>
			
			<Select
				options={priorityOptions}
				placeholder="Select with error"
				label="Required Priority"
				error="Priority is required"
			/>
		</div>
		
		<div class="mt-4 p-4 bg-slate-50 rounded">
			<p class="text-sm text-slate-600">
				Selected Country: <strong>{selectedCountry || 'None'}</strong><br>
				Selected Priority: <strong>{selectedPriority || 'None'}</strong>
			</p>
		</div>
	</section>

	<section class="mb-12">
		<h2 class="text-2xl font-semibold mb-4">Avatars</h2>
		<div class="space-y-6">
			<div>
				<h3 class="text-lg font-semibold mb-2">Sizes</h3>
				<div class="flex items-center gap-4">
					<Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" fallback="John Doe" size="sm" />
					<Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" fallback="John Doe" size="md" />
					<Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" fallback="John Doe" size="lg" />
					<Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" fallback="John Doe" size="xl" />
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-semibold mb-2">Fallback States</h3>
				<div class="flex items-center gap-4">
					<Avatar fallback="Jane Smith" />
					<Avatar fallback="Bob Wilson" />
					<Avatar fallback="A" />
					<Avatar />
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-semibold mb-2">Broken Image Fallback</h3>
				<div class="flex items-center gap-4">
					<Avatar src="https://broken-url.com/image.jpg" fallback="Error Test" />
					<Avatar src="https://broken-url.com/image.jpg" fallback="ET" />
					<Avatar src="https://broken-url.com/image.jpg" />
				</div>
			</div>
		</div>
	</section>

	<section class="mb-12">
		<h2 class="text-2xl font-semibold mb-4">Spinners</h2>
		<div class="space-y-6">
			<div>
				<h3 class="text-lg font-semibold mb-2">Sizes</h3>
				<div class="flex items-center gap-4">
					<Spinner size="sm" />
					<Spinner size="md" />
					<Spinner size="lg" />
					<Spinner size="xl" />
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-semibold mb-2">Variants</h3>
				<div class="flex items-center gap-4">
					<Spinner variant="default" />
					<Spinner variant="muted" />
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-semibold mb-2">In Context</h3>
				<div class="flex items-center gap-4 flex-wrap">
					<Button disabled>
						<Spinner size="sm" variant="light" class="mr-2" />
						Loading...
					</Button>
					
					<Card>
						<div class="p-6 flex items-center justify-center">
							<div class="text-center">
								<Spinner class="mx-auto mb-2" />
								<p class="text-sm text-slate-600">Loading content...</p>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	</section>

	<section class="mb-12">
		<h2 class="text-2xl font-semibold mb-4">Skeletons</h2>
		<div class="space-y-6">
			<div>
				<h3 class="text-lg font-semibold mb-2">Basic Shapes</h3>
				<div class="space-y-2">
					<Skeleton class="h-4 w-full" />
					<Skeleton class="h-4 w-3/4" />
					<Skeleton class="h-4 w-1/2" />
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-semibold mb-2">Circle Variant</h3>
				<div class="flex items-center gap-2">
					<Skeleton variant="circle" class="h-8 w-8" />
					<Skeleton variant="circle" class="h-10 w-10" />
					<Skeleton variant="circle" class="h-12 w-12" />
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-semibold mb-2">Complex Layout</h3>
				<Card>
					<div class="p-6">
						<div class="flex items-center space-x-4">
							<Skeleton variant="circle" class="h-12 w-12" />
							<div class="space-y-2 flex-1">
								<Skeleton class="h-4 w-1/4" />
								<Skeleton class="h-4 w-1/2" />
							</div>
						</div>
						<div class="mt-4 space-y-2">
							<Skeleton class="h-4 w-full" />
							<Skeleton class="h-4 w-full" />
							<Skeleton class="h-4 w-3/4" />
						</div>
						<div class="mt-4 flex justify-between">
							<Skeleton class="h-10 w-20" />
							<Skeleton class="h-10 w-20" />
						</div>
					</div>
				</Card>
			</div>
			
			<div>
				<h3 class="text-lg font-semibold mb-2">Article Preview</h3>
				<Card>
					<div class="p-6">
						<Skeleton class="h-48 w-full mb-4" />
						<Skeleton class="h-6 w-3/4 mb-2" />
						<div class="space-y-2">
							<Skeleton class="h-4 w-full" />
							<Skeleton class="h-4 w-full" />
							<Skeleton class="h-4 w-2/3" />
						</div>
						<div class="flex items-center mt-4 space-x-2">
							<Skeleton variant="circle" class="h-6 w-6" />
							<Skeleton class="h-4 w-24" />
							<Skeleton class="h-4 w-16" />
						</div>
					</div>
				</Card>
			</div>
		</div>
	</section>

	<section class="mb-12">
		<h2 class="text-2xl font-semibold mb-4">Containers</h2>
		<div class="space-y-8">
			<div>
				<h3 class="text-lg font-semibold mb-2">Different Sizes</h3>
				<div class="space-y-4">
					<Container size="sm" class="bg-blue-50 border border-blue-200 py-4">
						<p class="text-center text-blue-800">Small Container (max-w-screen-sm)</p>
					</Container>
					
					<Container size="md" class="bg-green-50 border border-green-200 py-4">
						<p class="text-center text-green-800">Medium Container (max-w-screen-md)</p>
					</Container>
					
					<Container size="lg" class="bg-purple-50 border border-purple-200 py-4">
						<p class="text-center text-purple-800">Large Container (max-w-screen-lg)</p>
					</Container>
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-semibold mb-2">Padding Variants</h3>
				<div class="space-y-4">
					<Container padding="none" class="bg-red-50 border border-red-200 py-4">
						<p class="text-red-800">No Padding</p>
					</Container>
					
					<Container padding="sm" class="bg-yellow-50 border border-yellow-200 py-4">
						<p class="text-yellow-800">Small Padding</p>
					</Container>
					
					<Container padding="lg" class="bg-indigo-50 border border-indigo-200 py-4">
						<p class="text-indigo-800">Large Padding</p>
					</Container>
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-semibold mb-2">Real Content Example</h3>
				<Container size="md" class="bg-slate-50 border border-slate-200 py-8">
					<div class="text-center">
						<h4 class="text-2xl font-bold mb-4">Welcome to Our App</h4>
						<p class="text-slate-600 mb-6">This content is nicely contained and centered.</p>
						<div class="flex justify-center gap-4">
							<Button>Get Started</Button>
							<Button variant="outline">Learn More</Button>
						</div>
					</div>
				</Container>
			</div>
		</div>
	</section>

	<section class="mb-12">
		<h2 class="text-2xl font-semibold mb-4">Stacks</h2>
		<div class="space-y-8">
			<div>
				<h3 class="text-lg font-semibold mb-2">Vertical Stack (Default)</h3>
				<Card>
					<div class="p-6">
						<Stack>
							<Button>First Item</Button>
							<Button variant="outline">Second Item</Button>
							<Button variant="secondary">Third Item</Button>
						</Stack>
					</div>
				</Card>
			</div>
			
			<div>
				<h3 class="text-lg font-semibold mb-2">Horizontal Stack</h3>
				<Card>
					<div class="p-6">
						<Stack direction="horizontal">
							<Button>First</Button>
							<Button variant="outline">Second</Button>
							<Button variant="secondary">Third</Button>
						</Stack>
					</div>
				</Card>
			</div>
			
			<div>
				<h3 class="text-lg font-semibold mb-2">Different Spacing</h3>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Card>
						<div class="p-6">
							<h4 class="text-sm font-medium mb-4">Small Spacing</h4>
							<Stack spacing="sm">
								<Badge>Tag 1</Badge>
								<Badge variant="secondary">Tag 2</Badge>
								<Badge variant="outline">Tag 3</Badge>
							</Stack>
						</div>
					</Card>
					
					<Card>
						<div class="p-6">
							<h4 class="text-sm font-medium mb-4">Large Spacing</h4>
							<Stack spacing="xl">
								<Badge>Tag 1</Badge>
								<Badge variant="secondary">Tag 2</Badge>
								<Badge variant="outline">Tag 3</Badge>
							</Stack>
						</div>
					</Card>
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-semibold mb-2">Alignment Examples</h3>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Card>
						<div class="p-6">
							<h4 class="text-sm font-medium mb-4">Center Aligned</h4>
							<Stack direction="horizontal" align="center" justify="center">
								<Avatar size="sm" fallback="A" />
								<div>
									<p class="font-medium">John Doe</p>
									<p class="text-sm text-slate-500">Developer</p>
								</div>
							</Stack>
						</div>
					</Card>
					
					<Card>
						<div class="p-6">
							<h4 class="text-sm font-medium mb-4">Space Between</h4>
							<Stack direction="horizontal" justify="between" align="center">
								<div>
									<p class="font-medium">Total</p>
									<p class="text-sm text-slate-500">Amount</p>
								</div>
								<Badge variant="success">$99.99</Badge>
							</Stack>
						</div>
					</Card>
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-semibold mb-2">Complex Layout</h3>
				<Card>
					<div class="p-6">
						<Stack spacing="lg">
							<Stack direction="horizontal" justify="between" align="center">
								<h4 class="text-lg font-semibold">User Profile</h4>
								<Button size="sm">Edit</Button>
							</Stack>
							
							<Stack direction="horizontal" spacing="lg" align="center">
								<Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" fallback="JD" size="lg" />
								<Stack spacing="sm">
									<h5 class="font-medium">John Doe</h5>
									<p class="text-slate-500">Senior Developer</p>
									<Stack direction="horizontal" spacing="sm">
										<Badge variant="outline">React</Badge>
										<Badge variant="outline">TypeScript</Badge>
										<Badge variant="outline">Node.js</Badge>
									</Stack>
								</Stack>
							</Stack>
						</Stack>
					</div>
				</Card>
			</div>
		</div>
	</section>

	<section class="mb-12">
		<h2 class="text-2xl font-semibold mb-4">Grids</h2>
		<div class="space-y-8">
			<div>
				<h3 class="text-lg font-semibold mb-2">Basic Grid Layouts</h3>
				<div class="space-y-6">
					<div>
						<h4 class="text-sm font-medium mb-2">2 Columns</h4>
						<Grid cols={2}>
							<Card><div class="p-4 text-center bg-blue-50">Item 1</div></Card>
							<Card><div class="p-4 text-center bg-green-50">Item 2</div></Card>
							<Card><div class="p-4 text-center bg-purple-50">Item 3</div></Card>
							<Card><div class="p-4 text-center bg-yellow-50">Item 4</div></Card>
						</Grid>
					</div>
					
					<div>
						<h4 class="text-sm font-medium mb-2">3 Columns</h4>
						<Grid cols={3}>
							<Card><div class="p-4 text-center bg-red-50">A</div></Card>
							<Card><div class="p-4 text-center bg-orange-50">B</div></Card>
							<Card><div class="p-4 text-center bg-pink-50">C</div></Card>
							<Card><div class="p-4 text-center bg-indigo-50">D</div></Card>
							<Card><div class="p-4 text-center bg-teal-50">E</div></Card>
							<Card><div class="p-4 text-center bg-cyan-50">F</div></Card>
						</Grid>
					</div>
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-semibold mb-2">Different Gap Sizes</h3>
				<div class="space-y-4">
					<div>
						<h4 class="text-sm font-medium mb-2">Small Gap</h4>
						<Grid cols={4} gap="sm">
							<Card><div class="p-2 text-center bg-slate-100 text-xs">1</div></Card>
							<Card><div class="p-2 text-center bg-slate-100 text-xs">2</div></Card>
							<Card><div class="p-2 text-center bg-slate-100 text-xs">3</div></Card>
							<Card><div class="p-2 text-center bg-slate-100 text-xs">4</div></Card>
						</Grid>
					</div>
					
					<div>
						<h4 class="text-sm font-medium mb-2">Large Gap</h4>
						<Grid cols={4} gap="xl">
							<Card><div class="p-2 text-center bg-slate-100 text-xs">1</div></Card>
							<Card><div class="p-2 text-center bg-slate-100 text-xs">2</div></Card>
							<Card><div class="p-2 text-center bg-slate-100 text-xs">3</div></Card>
							<Card><div class="p-2 text-center bg-slate-100 text-xs">4</div></Card>
						</Grid>
					</div>
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-semibold mb-2">Product Grid Example</h3>
				<Grid cols={3} gap="lg" class="md:grid-cols-4 lg:grid-cols-6">
					{#each Array(12) as _, i}
						<Card>
							<div class="p-4">
								<div class="w-full h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded mb-3"></div>
								<h5 class="font-medium text-sm mb-1">Product {i + 1}</h5>
								<p class="text-xs text-slate-500 mb-2">Description text</p>
								<Stack direction="horizontal" justify="between" align="center">
									<Badge variant="outline" class="text-xs">$99</Badge>
									<Button size="sm" class="text-xs px-2 py-1">Buy</Button>
								</Stack>
							</div>
						</Card>
					{/each}
				</Grid>
			</div>
			
			<div>
				<h3 class="text-lg font-semibold mb-2">Dashboard Layout</h3>
				<Grid cols={4} rows={3} gap="md" class="h-96">
					<Card class="col-span-2 row-span-2">
						<div class="p-6 h-full flex flex-col">
							<h4 class="font-semibold mb-4">Main Chart</h4>
							<div class="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 rounded flex items-center justify-center">
								<p class="text-slate-500">Chart Area</p>
							</div>
						</div>
					</Card>
					
					<Card class="col-span-2">
						<div class="p-4">
							<h4 class="font-semibold mb-2">Stats</h4>
							<Stack direction="horizontal" justify="between">
								<div class="text-center">
									<p class="text-2xl font-bold text-blue-600">1.2k</p>
									<p class="text-xs text-slate-500">Users</p>
								</div>
								<div class="text-center">
									<p class="text-2xl font-bold text-green-600">$89k</p>
									<p class="text-xs text-slate-500">Revenue</p>
								</div>
								<div class="text-center">
									<p class="text-2xl font-bold text-purple-600">94%</p>
									<p class="text-xs text-slate-500">Uptime</p>
								</div>
							</Stack>
						</div>
					</Card>
					
					<Card padding="sm" class="overflow-hidden">
						<h4 class="font-semibold mb-2 text-sm">Activity</h4>
						<div class="space-y-2">
							<div class="flex items-center gap-2">
								<Avatar size="sm" fallback="U" />
								<p class="text-xs">User login</p>
							</div>
							<div class="flex items-center gap-2">
								<Avatar size="sm" fallback="S" />
								<p class="text-xs">Sale completed</p>
							</div>
						</div>
					</Card>
					
					<Card padding="sm" class="overflow-hidden">
						<h4 class="font-semibold mb-2 text-sm">Quick Actions</h4>
						<Stack spacing="sm">
							<Button size="sm" class="text-xs">Export</Button>
							<Button size="sm" variant="outline" class="text-xs">Settings</Button>
						</Stack>
					</Card>
				</Grid>
			</div>
		</div>
	</section>

	<section class="mb-12">
		<h2 class="text-2xl font-semibold mb-4">Navbars</h2>
		<div class="space-y-8">
			<div>
				<h3 class="text-lg font-semibold mb-2">Basic Navbar</h3>
				<div class="border rounded-lg overflow-hidden">
					<Navbar brand="My App" items={navItems} />
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-semibold mb-2">Different Variants</h3>
				<div class="space-y-4">
					<div>
						<h4 class="text-sm font-medium mb-2 text-slate-600">Default - with border and subtle shadow</h4>
						<div class="border rounded-lg overflow-hidden">
							<Navbar variant="default" brand="Default" items={navItems} />
						</div>
					</div>
					
					<div>
						<h4 class="text-sm font-medium mb-2 text-slate-600">Transparent - no background, no border</h4>
						<div class="border rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 p-4">
							<Navbar variant="transparent" brand="Transparent" items={navItems} />
						</div>
					</div>
					
					<div>
						<h4 class="text-sm font-medium mb-2 text-slate-600">Elevated - with stronger shadow</h4>
						<div class="border rounded-lg overflow-hidden bg-slate-50 p-4">
							<Navbar variant="elevated" brand="Elevated" items={navItems} />
						</div>
					</div>
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-semibold mb-2">Different Sizes</h3>
				<div class="space-y-4">
					<div class="border rounded-lg overflow-hidden">
						<Navbar size="sm" brand="Small" items={navItems} />
					</div>
					
					<div class="border rounded-lg overflow-hidden">
						<Navbar size="md" brand="Medium" items={navItems} />
					</div>
					
					<div class="border rounded-lg overflow-hidden">
						<Navbar size="lg" brand="Large" items={navItems} />
					</div>
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-semibold mb-2">With Custom Content</h3>
				<div class="border rounded-lg overflow-hidden">
					<Navbar brand="My Store" items={navItems}>
						{#snippet children()}
							<Stack direction="horizontal" spacing="sm" align="center">
								<Badge variant="success">Pro</Badge>
								<Button size="sm" variant="outline">Login</Button>
							</Stack>
						{/snippet}
					</Navbar>
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-semibold mb-2">Responsive Demo</h3>
				<p class="text-sm text-slate-600 mb-4">
					Resize your browser window to see the mobile hamburger menu. The navigation automatically adapts to smaller screens.
				</p>
				<div class="border rounded-lg overflow-hidden">
					<Navbar 
						brand="Responsive Nav" 
						items={[
							{ label: 'Dashboard', href: '#dashboard', active: true },
							{ label: 'Analytics', href: '#analytics' },
							{ label: 'Reports', href: '#reports' },
							{ label: 'Settings', href: '#settings' },
							{ label: 'Profile', onClick: () => alert('Profile clicked!') },
						]}
					>
						{#snippet children()}
							<Stack direction="horizontal" spacing="sm" align="center">
								<Avatar size="sm" fallback="JD" />
								<span class="text-sm font-medium">John Doe</span>
							</Stack>
						{/snippet}
					</Navbar>
				</div>
			</div>
		</div>
	</section>

	<section class="mb-12">
		<h2 class="text-2xl font-semibold mb-4">Sidebars</h2>
		<div class="space-y-8">
			<div>
				<h3 class="text-lg font-semibold mb-2">Basic Sidebar</h3>
				<div class="border rounded-lg overflow-hidden h-96 flex">
					<Sidebar title="Navigation" items={sidebarItems.slice(0, 5)} />
					<div class="flex-1 p-6 bg-slate-50">
						<h4 class="text-lg font-semibold mb-2">Main Content Area</h4>
						<p class="text-slate-600">This is where your page content would go. The sidebar provides navigation on the left.</p>
					</div>
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-semibold mb-2">Different Variants</h3>
				<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
					<div>
						<h4 class="text-sm font-medium mb-2 text-slate-600">Default</h4>
						<div class="border rounded-lg overflow-hidden h-64 flex">
							<Sidebar variant="default" items={sidebarItems.slice(0, 4)} />
							<div class="flex-1 p-4 bg-slate-50 text-center">
								<p class="text-sm text-slate-600">Content</p>
							</div>
						</div>
					</div>
					
					<div>
						<h4 class="text-sm font-medium mb-2 text-slate-600">Bordered</h4>
						<div class="border rounded-lg overflow-hidden h-64 flex bg-slate-50 p-2">
							<Sidebar variant="bordered" items={sidebarItems.slice(0, 4)} />
							<div class="flex-1 p-4 text-center">
								<p class="text-sm text-slate-600">Content</p>
							</div>
						</div>
					</div>
					
					<div>
						<h4 class="text-sm font-medium mb-2 text-slate-600">Elevated</h4>
						<div class="border rounded-lg overflow-hidden h-64 flex bg-slate-50">
							<Sidebar variant="elevated" items={sidebarItems.slice(0, 4)} />
							<div class="flex-1 p-4 text-center">
								<p class="text-sm text-slate-600">Content</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-semibold mb-2">Different Widths</h3>
				<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
					<div>
						<h4 class="text-sm font-medium mb-2 text-slate-600">Small (w-48)</h4>
						<div class="border rounded-lg overflow-hidden h-64 flex">
							<Sidebar width="sm" items={sidebarItems.slice(0, 4)} />
							<div class="flex-1 p-4 bg-slate-50 text-center">
								<p class="text-sm text-slate-600">Content</p>
							</div>
						</div>
					</div>
					
					<div>
						<h4 class="text-sm font-medium mb-2 text-slate-600">Medium (w-64)</h4>
						<div class="border rounded-lg overflow-hidden h-64 flex">
							<Sidebar width="md" items={sidebarItems.slice(0, 4)} />
							<div class="flex-1 p-4 bg-slate-50 text-center">
								<p class="text-sm text-slate-600">Content</p>
							</div>
						</div>
					</div>
					
					<div>
						<h4 class="text-sm font-medium mb-2 text-slate-600">Large (w-80)</h4>
						<div class="border rounded-lg overflow-hidden h-64 flex">
							<Sidebar width="lg" items={sidebarItems.slice(0, 4)} />
							<div class="flex-1 p-4 bg-slate-50 text-center">
								<p class="text-sm text-slate-600">Content</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-semibold mb-2">Collapsible Sidebar</h3>
				<div class="border rounded-lg overflow-hidden h-96 flex">
					<Sidebar 
						title="App Navigation"
						items={sidebarItems}
						collapsible={true}
						collapsed={sidebarCollapsed}
						onCollapsedChange={(collapsed) => sidebarCollapsed = collapsed}
					/>
					<div class="flex-1 p-6 bg-slate-50">
						<h4 class="text-lg font-semibold mb-2">Collapsible Demo</h4>
						<p class="text-slate-600 mb-4">
							Click the chevron icon in the sidebar header to toggle between expanded and collapsed states.
						</p>
						<p class="text-sm text-slate-500">
							Current state: <strong>{sidebarCollapsed ? 'Collapsed' : 'Expanded'}</strong>
						</p>
					</div>
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-semibold mb-2">Right-positioned Sidebar</h3>
				<div class="border rounded-lg overflow-hidden h-96 flex">
					<div class="flex-1 p-6 bg-slate-50">
						<h4 class="text-lg font-semibold mb-2">Main Content</h4>
						<p class="text-slate-600">Content area with sidebar on the right side instead of left.</p>
					</div>
					<Sidebar 
						position="right"
						title="Right Panel"
						items={[
							{ label: 'Profile', icon: Users, active: true },
							{ label: 'Notifications', icon: Mail },
							{ label: 'Settings', icon: Settings },
							{ label: 'Help', icon: HelpCircle },
						]}
					/>
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-semibold mb-2">With Custom Content</h3>
				<div class="border rounded-lg overflow-hidden h-96 flex">
					<Sidebar title="Dashboard" items={sidebarItems.slice(0, 6)}>
						{#snippet children()}
							<div class="border-t border-slate-200 pt-4">
								<Stack spacing="sm">
									<div class="flex items-center gap-2">
										<Avatar size="sm" fallback="JD" />
										<div class="text-xs">
											<p class="font-medium">John Doe</p>
											<p class="text-slate-500">Admin</p>
										</div>
									</div>
									<Button size="sm" variant="outline" class="w-full text-xs">
										Sign Out
									</Button>
								</Stack>
							</div>
						{/snippet}
					</Sidebar>
					<div class="flex-1 p-6 bg-slate-50">
						<h4 class="text-lg font-semibold mb-2">Custom Content Demo</h4>
						<p class="text-slate-600">The sidebar can include custom content like user profiles, additional actions, or any other components.</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="mb-12">
		<h2 class="text-2xl font-semibold mb-4">Modals & Dialogs</h2>
		<div class="space-y-8">
			<div>
				<h3 class="text-lg font-semibold mb-4">Basic Modal Examples</h3>
				<div class="flex flex-wrap gap-4">
					<Button onclick={() => basicModalOpen = true}>
						Basic Modal
					</Button>
					
					<Button variant="destructive" onclick={() => confirmModalOpen = true}>
						Confirm Dialog
					</Button>
					
					<Button variant="outline" onclick={() => formModalOpen = true}>
						Form Modal
					</Button>
					
					<Button variant="secondary" onclick={() => alertModalOpen = true}>
						Alert Modal
					</Button>
				</div>
			</div>

			<div>
				<h3 class="text-lg font-semibold mb-4">Different Sizes</h3>
				<div class="flex flex-wrap gap-4">
					<Button size="sm" onclick={() => basicModalOpen = true}>
						Small Modal
					</Button>
					
					<Button onclick={() => basicModalOpen = true}>
						Medium Modal (Default)
					</Button>
					
					<Button onclick={() => fullscreenModalOpen = true}>
						Large Modal
					</Button>
					
					<Button variant="outline" onclick={() => fullscreenModalOpen = true}>
						Fullscreen Modal
					</Button>
				</div>
			</div>

			<div>
				<h3 class="text-lg font-semibold mb-4">Usage Examples</h3>
				<p class="text-slate-600 mb-4">
					Click the buttons above to see different modal configurations. Each modal demonstrates different use cases:
				</p>
				<ul class="text-sm text-slate-600 space-y-1 ml-4">
					<li>• <strong>Basic Modal</strong> - Simple content display</li>
					<li>• <strong>Confirm Dialog</strong> - Destructive action confirmation</li>
					<li>• <strong>Form Modal</strong> - Interactive forms and inputs</li>
					<li>• <strong>Alert Modal</strong> - Information or warning messages</li>
				</ul>
			</div>
		</div>
	</section>

	<!-- Modal Components -->
	<SimpleModal 
		bind:open={basicModalOpen}
		title="Basic Modal"
		description="This is a simple modal dialog for displaying content."
	>
		{#snippet children()}
			<p class="text-slate-600">
				This modal demonstrates the basic functionality with a title, description, and content area. 
				You can close it by clicking the X button, pressing Escape, or clicking outside the modal.
			</p>
			<div class="mt-4">
				<Badge variant="success">Feature Rich</Badge>
				<Badge variant="outline" class="ml-2">Accessible</Badge>
			</div>
		{/snippet}
		{#snippet footer()}
			<Button variant="outline" onclick={() => basicModalOpen = false}>
				Cancel
			</Button>
			<Button onclick={() => basicModalOpen = false}>
				Got it
			</Button>
		{/snippet}
	</SimpleModal>

	<SimpleModal 
		bind:open={confirmModalOpen}
		title="Confirm Deletion"
		description="This action cannot be undone. Are you sure you want to delete this item?"
		size="sm"
	>
		{#snippet children()}
			<div class="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
				<AlertTriangle class="h-5 w-5 text-red-600" />
				<div>
					<p class="text-sm font-medium text-red-800">Warning</p>
					<p class="text-sm text-red-600">This will permanently delete the selected item.</p>
				</div>
			</div>
		{/snippet}
		{#snippet footer()}
			<Button variant="outline" onclick={() => confirmModalOpen = false}>
				Cancel
			</Button>
			<Button variant="destructive" onclick={handleDeleteConfirm}>
				<Trash2 class="h-4 w-4 mr-2" />
				Delete
			</Button>
		{/snippet}
	</SimpleModal>

	<SimpleModal 
		bind:open={formModalOpen}
		title="Contact Form"
		description="Send us a message and we'll get back to you."
		size="lg"
	>
		{#snippet children()}
			<Stack spacing="lg">
				<Input
					label="Name"
					placeholder="Enter your name"
					bind:value={formData.name}
				/>
				<Input
					label="Email"
					type="email"
					placeholder="Enter your email"
					bind:value={formData.email}
				/>
				<TextArea
					label="Message"
					placeholder="Enter your message..."
					rows="4"
					bind:value={formData.message}
				/>
			</Stack>
		{/snippet}
		{#snippet footer()}
			<Button variant="outline" onclick={() => formModalOpen = false}>
				Cancel
			</Button>
			<Button onclick={handleFormSubmit} disabled={!formData.name || !formData.email}>
				Send Message
			</Button>
		{/snippet}
	</SimpleModal>

	<SimpleModal 
		bind:open={alertModalOpen}
		title="Success!"
		description="Your action has been completed successfully."
		size="sm"
	>
		{#snippet children()}
			<div class="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
				<CheckCircle class="h-5 w-5 text-green-600" />
				<div>
					<p class="text-sm font-medium text-green-800">Operation Complete</p>
					<p class="text-sm text-green-600">All changes have been saved successfully.</p>
				</div>
			</div>
		{/snippet}
		{#snippet footer()}
			<Button onclick={() => alertModalOpen = false}>
				<CheckCircle class="h-4 w-4 mr-2" />
				Continue
			</Button>
		{/snippet}
	</SimpleModal>

	<SimpleModal 
		bind:open={fullscreenModalOpen}
		title="Large Content Modal"
		description="This modal demonstrates larger content areas and different sizing options."
		size="xl"
	>
		{#snippet children()}
			<div class="space-y-6">
				<div>
					<h4 class="text-lg font-semibold mb-3">Content Overview</h4>
					<p class="text-slate-600 mb-4">
						This large modal can accommodate more complex content, multiple sections, 
						and detailed information. It's perfect for forms, data displays, or rich content.
					</p>
				</div>
				
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card padding="md">
						<h5 class="font-semibold mb-2">Statistics</h5>
						<div class="space-y-2">
							<div class="flex justify-between">
								<span class="text-sm text-slate-600">Users</span>
								<Badge variant="success">1,234</Badge>
							</div>
							<div class="flex justify-between">
								<span class="text-sm text-slate-600">Revenue</span>
								<Badge variant="outline">$12,345</Badge>
							</div>
							<div class="flex justify-between">
								<span class="text-sm text-slate-600">Growth</span>
								<Badge variant="secondary">+15%</Badge>
							</div>
						</div>
					</Card>
					
					<Card padding="md">
						<h5 class="font-semibold mb-2">Recent Activity</h5>
						<div class="space-y-2">
							<div class="flex items-center gap-2">
								<Avatar size="sm" fallback="JD" />
								<div class="text-sm">
									<p class="font-medium">John Doe</p>
									<p class="text-slate-500">Updated profile</p>
								</div>
							</div>
							<div class="flex items-center gap-2">
								<Avatar size="sm" fallback="SM" />
								<div class="text-sm">
									<p class="font-medium">Sarah Miller</p>
									<p class="text-slate-500">Created new project</p>
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>
		{/snippet}
		{#snippet footer()}
			<Button variant="outline" onclick={() => fullscreenModalOpen = false}>
				Close
			</Button>
			<Button onclick={() => fullscreenModalOpen = false}>
				Save Changes
			</Button>
		{/snippet}
	</SimpleModal>

	<section class="mb-12">
		<h2 class="text-2xl font-semibold mb-4">Sheets & Drawers</h2>
		<div class="space-y-8">
			<div>
				<h3 class="text-lg font-semibold mb-4">Different Sides</h3>
				<div class="flex flex-wrap gap-4">
					<Button onclick={() => rightSheetOpen = true}>
						Right Sheet
					</Button>
					
					<Button variant="outline" onclick={() => leftSheetOpen = true}>
						Left Sheet
					</Button>
					
					<Button variant="secondary" onclick={() => topSheetOpen = true}>
						Top Sheet
					</Button>
					
					<Button variant="ghost" onclick={() => bottomSheetOpen = true}>
						Bottom Sheet
					</Button>
				</div>
			</div>

			<div>
				<h3 class="text-lg font-semibold mb-4">Settings Panel Example</h3>
				<div class="flex gap-4">
					<Button onclick={() => settingsSheetOpen = true}>
						<Settings class="h-4 w-4 mr-2" />
						Open Settings
					</Button>
				</div>
			</div>

			<div>
				<h3 class="text-lg font-semibold mb-4">Usage Examples</h3>
				<p class="text-slate-600 mb-4">
					Sheets/Drawers slide out from the edges of the screen and are perfect for:
				</p>
				<ul class="text-sm text-slate-600 space-y-1 ml-4">
					<li>• <strong>Navigation menus</strong> - Mobile-friendly slide-out navigation</li>
					<li>• <strong>Settings panels</strong> - Configuration options and preferences</li>
					<li>• <strong>Detail views</strong> - Additional information about selected items</li>
					<li>• <strong>Form panels</strong> - Side panels for creating or editing content</li>
					<li>• <strong>Filter panels</strong> - Search and filter controls</li>
				</ul>
			</div>
		</div>
	</section>

	<!-- Sheet Components -->
	<Sheet bind:open={rightSheetOpen} side="right" title="Right Panel">
		{#snippet children()}
			<div class="space-y-4">
				<p class="text-slate-600">This sheet slides in from the right side of the screen.</p>
				<div class="space-y-3">
					<div class="flex items-center gap-2">
						<Avatar size="sm" fallback="JD" />
						<div>
							<p class="text-sm font-medium">John Doe</p>
							<p class="text-xs text-slate-500">Administrator</p>
						</div>
					</div>
					<div class="border-t pt-3">
						<p class="text-sm font-medium mb-2">Quick Actions</p>
						<Stack spacing="sm">
							<Button variant="outline" size="sm" class="w-full">
								View Profile
							</Button>
							<Button variant="outline" size="sm" class="w-full">
								Settings
							</Button>
							<Button variant="outline" size="sm" class="w-full">
								Sign Out
							</Button>
						</Stack>
					</div>
				</div>
			</div>
		{/snippet}
	</Sheet>

	<Sheet bind:open={leftSheetOpen} side="left" title="Navigation" size="md">
		{#snippet children()}
			<div class="space-y-4">
				<p class="text-slate-600">This sheet slides in from the left side.</p>
				<nav class="space-y-2">
					{#each sidebarItems.slice(0, 6) as item}
						<a
							href={item.href || '#'}
							class="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-100 transition-colors"
						>
							{#if item.icon}
								<item.icon class="h-4 w-4" />
							{/if}
							<span>{item.label}</span>
						</a>
					{/each}
				</nav>
			</div>
		{/snippet}
	</Sheet>

	<Sheet bind:open={topSheetOpen} side="top" title="Notifications" size="md">
		{#snippet children()}
			<div class="space-y-4">
				<p class="text-slate-600">This sheet slides down from the top.</p>
				<div class="space-y-3">
					{#each Array(3) as _, i}
						<div class="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
							<div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
							<div class="flex-1">
								<p class="text-sm font-medium">Notification {i + 1}</p>
								<p class="text-xs text-slate-500">New message received</p>
								<p class="text-xs text-slate-400 mt-1">2 minutes ago</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/snippet}
	</Sheet>

	<Sheet bind:open={bottomSheetOpen} side="bottom" title="Quick Actions" size="sm">
		{#snippet children()}
			<div class="space-y-4">
				<p class="text-slate-600">This sheet slides up from the bottom.</p>
				<Grid cols={2} gap="sm">
					<Button variant="outline" size="sm">
						<Calendar class="h-4 w-4 mr-2" />
						Schedule
					</Button>
					<Button variant="outline" size="sm">
						<Mail class="h-4 w-4 mr-2" />
						Message
					</Button>
					<Button variant="outline" size="sm">
						<FileText class="h-4 w-4 mr-2" />
						Document
					</Button>
					<Button variant="outline" size="sm">
						<Users class="h-4 w-4 mr-2" />
						Team
					</Button>
				</Grid>
			</div>
		{/snippet}
	</Sheet>

	<Sheet bind:open={settingsSheetOpen} side="right" title="Settings" size="lg">
		{#snippet children()}
			<div class="space-y-6">
				<div>
					<h4 class="text-sm font-semibold mb-3">Profile Settings</h4>
					<Stack spacing="md">
						<Input label="Display Name" placeholder="Enter your name" />
						<Input label="Email" type="email" placeholder="your@email.com" />
						<TextArea label="Bio" placeholder="Tell us about yourself..." rows="3" />
					</Stack>
				</div>
				
				<div>
					<h4 class="text-sm font-semibold mb-3">Preferences</h4>
					<div class="space-y-3">
						<div class="flex items-center justify-between">
							<div>
								<p class="text-sm font-medium">Email Notifications</p>
								<p class="text-xs text-slate-500">Receive email updates</p>
							</div>
							<input type="checkbox" class="rounded" checked />
						</div>
						<div class="flex items-center justify-between">
							<div>
								<p class="text-sm font-medium">Dark Mode</p>
								<p class="text-xs text-slate-500">Toggle dark theme</p>
							</div>
							<input type="checkbox" class="rounded" />
						</div>
						<div class="flex items-center justify-between">
							<div>
								<p class="text-sm font-medium">Auto-save</p>
								<p class="text-xs text-slate-500">Automatically save changes</p>
							</div>
							<input type="checkbox" class="rounded" checked />
						</div>
					</div>
				</div>
				
				<div>
					<h4 class="text-sm font-semibold mb-3">Account</h4>
					<Stack spacing="sm">
						<Button variant="outline" class="w-full">
							Change Password
						</Button>
						<Button variant="outline" class="w-full">
							Export Data
						</Button>
						<Button variant="destructive" class="w-full">
							Delete Account
						</Button>
					</Stack>
				</div>
			</div>
		{/snippet}
		{#snippet footer()}
			<Button variant="outline" onclick={() => settingsSheetOpen = false}>
				Cancel
			</Button>
			<Button onclick={() => settingsSheetOpen = false}>
				Save Changes
			</Button>
		{/snippet}
	</Sheet>
</main>
