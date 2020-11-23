/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-23 15:28:22
 * @LastEditTime: 2020-11-23 17:37:27
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /redis-prometheus-dashboard/web/src/utils/redis_metrics.ts
 * @LICENSE: Apache-2.0
 */

import { Metric } from "./metrics"

export type RedisMetricHandler = (metric: Metric) => RedisMetric | Array<RedisMetric>
export interface RedisMetricHandlerMap {
    [key: string]: RedisMetricHandler
}
export interface RedisMetric {
    name: string
    value: Array<number>
}

export const METRICS_MAP: RedisMetricHandlerMap = {
    // 碎片整理
    "redis_active_defrag_running": (metric: Metric) => { return { name: "asd", value: [123] } },
    // "redis_aof_current_rewrite_duration_sec": null,
    // "redis_aof_enabled": null,
    // "redis_aof_last_bgrewrite_status": null,
    // "redis_aof_last_cow_size_bytes": null,
    // "redis_aof_last_rewrite_duration_sec": null,
    // "redis_aof_last_write_status": null,
    // "redis_aof_rewrite_in_progress": null,
    // "redis_aof_rewrite_scheduled": null,
    // "redis_blocked_clients": null,
    // "redis_client_biggest_input_buf": null,
    // "redis_client_longest_output_list": null,
    // "redis_cluster_enabled": null,
    // "redis_commands_duration_seconds_total": null,
    // "redis_commands_processed_total": null,
    // "redis_commands_total": null,
    // "redis_config_maxclients": null,
    // "redis_config_maxmemory": null,
    // "redis_connected_clients": null,
    // "redis_connected_slaves": null,
    // "redis_connections_received_total": null,
    // "redis_cpu_sys_children_seconds_total": null,
    // "redis_cpu_sys_seconds_total": null,
    // "redis_cpu_user_children_seconds_total": null,
    // "redis_cpu_user_seconds_total": null,
    // "redis_db_avg_ttl_seconds": null,
    // "redis_db_keys": null,
    // "redis_db_keys_expiring": null,
    // "redis_defrag_hits": null,
    // "redis_defrag_key_hits": null,
    // "redis_defrag_key_misses": null,
    // "redis_defrag_misses": null,
    // "redis_evicted_keys_total": null,
    // "redis_expired_time_cap_reached_total": null,
    // "redis_exporter_build_info": null,
    // "redis_exporter_last_scrape_connect_time_seconds": null,
    // "redis_exporter_last_scrape_duration_seconds": null,
    // "redis_exporter_last_scrape_error": null,
    // "redis_exporter_scrape_duration_seconds_count": null,
    // "redis_exporter_scrape_duration_seconds_sum": null,
    // "redis_exporter_scrapes_total": null,
    // "redis_instance_info": null,
    // "redis_keyspace_hits_total": null,
    // "redis_keyspace_misses_total": null,
    // "redis_last_slow_execution_duration_seconds": null,
    // "redis_latest_fork_seconds": null,
    // "redis_lazyfree_pending_objects": null,
    // "redis_loading_dump_file": null,
    // "redis_master_repl_offset": null,
    // "redis_mem_fragmentation_ratio": null,
    // "redis_memory_max_bytes": null,
    // "redis_memory_used_bytes": null,
    // "redis_memory_used_bytesredis_memory_max_bytes": null,
    // "redis_memory_used_dataset_bytes": null,
    // "redis_memory_used_lua_bytes": null,
    // "redis_memory_used_overhead_bytes": null,
    // "redis_memory_used_peak_bytes": null,
    // "redis_memory_used_rss_bytes": null,
    // "redis_memory_used_startup_bytes": null,
    // "redis_migrate_cached_sockets_total": null,
    // "redis_net_input_bytes_total": null,
    // "redis_net_output_bytes_total": null,
    // "redis_process_id": null,
    // "redis_process_id:node_memory_utilisation:": null,
    // "redis_pubsub_channels": null,
    // "redis_pubsub_patterns": null,
    // "redis_rdb_bgsave_in_progress": null,
    // "redis_rdb_changes_since_last_save": null,
    // "redis_rdb_current_bgsave_duration_sec": null,
    // "redis_rdb_last_bgsave_duration_sec": null,
    // "redis_rdb_last_bgsave_status": null,
    // "redis_rdb_last_cow_size_bytes": null,
    // "redis_rdb_last_save_timestamp_seconds": null,
    // "redis_rejected_connections_total": null,
    // "redis_repl_backlog_first_byte_offset": null,
    // "redis_repl_backlog_history_bytes": null,
    // "redis_repl_backlog_is_active": null,
    // "redis_replica_partial_resync_accepted": null,
    // "redis_replica_partial_resync_denied": null,
    // "redis_replica_resyncs_full": null,
    // "redis_replication_backlog_bytes": null,
    // "redis_second_repl_offset": null,
    // "redis_slave_expires_tracked_keys": null,
    // "redis_slowlog_last_id": null,
    // "redis_slowlog_length": null,
    // "redis_start_time_seconds": null,
    // "redis_target_scrape_request_errors_total": null,
    // "redis_up": null,
    // "redis_uptime_in_seconds": null,
}