<template>
	<div class="card">
		<h2 class="card-title">{{ event.title }}</h2>
		<p class="card-description">{{ event.description }}</p>
		<p class="card-date">📅 Date: {{ event.date }}</p>
		<p class="card-location">📍 Location: {{ event.location }}</p>
	</div>
</template>

<script>
export default {
	name: "DetailCard",
	props: {
		event: {
			type: Object,
			required: true,
		},
	},
	mounted() {
		// 添加日志以确认组件被渲染
		console.log("DetailCard mounted with event:", this.event);
	},
};
</script>

<style scoped>
.card {
	border: 1px solid #ddd;
	border-radius: 8px;
	padding: 16px;
	margin: 0.5rem 0;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	background-color: white;
	z-index: 1050; /* 设置 z-index 值 */
	position: relative; /* 确保 z-index 生效 */
}

.card-title {
	font-size: 1.5rem;
	margin-bottom: 8px;
}

.card-description {
	font-size: 1rem;
	margin-bottom: 8px;
	color: #555;
}

.card-date,
.card-location {
	font-size: 0.9rem;
	color: #777;
}
</style>