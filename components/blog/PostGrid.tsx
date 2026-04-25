"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import moment from "moment";
import { X } from "lucide-react";

const PER_PAGE = 5;

function excerptText(excerpt: any): string {
  if (!excerpt) return "";
  if (typeof excerpt === "string") return excerpt;
  // Storyblok rich-text JSON: walk content nodes for text.
  const parts: string[] = [];
  const walk = (node: any) => {
    if (!node) return;
    if (typeof node.text === "string") parts.push(node.text);
    if (Array.isArray(node.content)) node.content.forEach(walk);
  };
  walk(excerpt);
  return parts.join(" ").trim();
}

export default function PostGrid({ posts }: { posts: any[] }) {
  const [tag, setTag] = useState<string>("all");
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [dropOpen, setDropOpen] = useState<boolean>(false);
  const [tagSearch, setTagSearch] = useState<string>("");
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => (p.tag_list || []).forEach((t: string) => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  const visibleTags = useMemo(() => {
    if (!tagSearch.trim()) return allTags;
    const q = tagSearch.trim().toLowerCase();
    return allTags.filter((t) => t.toLowerCase().includes(q));
  }, [allTags, tagSearch]);

  const filtered = useMemo(() => {
    let result = tag === "all" ? posts : posts.filter((p) => (p.tag_list || []).includes(tag));
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((p) => {
        const title = (p.name || "").toLowerCase();
        const excerpt = excerptText(p.content?.excerpt).toLowerCase();
        return title.includes(q) || excerpt.includes(q);
      });
    }
    return result;
  }, [posts, tag, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PER_PAGE;
  const slice = filtered.slice(start, start + PER_PAGE);
  const from = filtered.length === 0 ? 0 : start + 1;
  const to = Math.min(start + PER_PAGE, filtered.length);

  const setTagAndReset = (t: string) => {
    setTag(t);
    setPage(1);
  };

  const clearSearch = () => {
    setSearch("");
    setPage(1);
  };

  return (
    <>
      <div className="m-toolbar">
        <div className="m-search-wrap">
          <input
            className="m-search"
            type="search"
            placeholder="Search posts…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            aria-label="Search posts"
          />
          {search && (
            <button
              type="button"
              className="m-search-clear"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <X size={14} strokeWidth={2.5} />
            </button>
          )}
        </div>
        <div className="m-filter-wrap" ref={dropRef}>
          <button
            type="button"
            className={`m-filter-btn${tag !== "all" ? " is-active" : ""}`}
            onClick={() => setDropOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={dropOpen}
          >
            {tag === "all" ? "Filter" : tag}
            <span className="m-filter-chevron" aria-hidden="true">▾</span>
          </button>
          {dropOpen && (
            <div className="m-filter-drop" role="listbox" aria-label="Filter by tag">
              <div className="m-filter-search-wrap">
                <input
                  className="m-filter-search"
                  type="search"
                  placeholder="Search tags…"
                  value={tagSearch}
                  onChange={(e) => setTagSearch(e.target.value)}
                  aria-label="Search tags"
                />
                {tagSearch && (
                  <button
                    type="button"
                    className="m-search-clear"
                    onClick={() => setTagSearch("")}
                    aria-label="Clear tag search"
                  >
                    <X size={12} strokeWidth={2.5} />
                  </button>
                )}
              </div>
              <div className="m-filter-list">
                {!tagSearch.trim() && (
                  <button
                    type="button"
                    role="option"
                    aria-selected={tag === "all"}
                    className={`m-filter-item${tag === "all" ? " is-active" : ""}`}
                    onClick={() => { setTagAndReset("all"); setDropOpen(false); }}
                  >
                    All
                  </button>
                )}
                {visibleTags.length === 0 ? (
                  <p className="m-filter-empty">No tags found.</p>
                ) : (
                  visibleTags.map((t) => (
                    <button
                      key={t}
                      type="button"
                      role="option"
                      aria-selected={tag === t}
                      className={`m-filter-item${tag === t ? " is-active" : ""}`}
                      onClick={() => { setTagAndReset(t); setDropOpen(false); }}
                    >
                      {t}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="m-blog-list" aria-live="polite">
        {slice.length === 0 ? (
          <p className="m-empty">
            No posts found{tag !== "all" ? ` in "${tag}"` : ""}{search.trim() ? ` for "${search.trim()}"` : ""}.
          </p>
        ) : (
          slice.map((post: any) => {
            const excerpt = excerptText(post.content?.excerpt);
            return (
              <Link
                key={post.slug}
                href={`/${post.full_slug}`}
                className="m-bp"
              >
                <div className="m-bp-meta">
                  <span>
                    {moment(post.first_published_at).format("MMM DD, YYYY")}
                  </span>
                </div>
                <h2 className="m-bp-title">{post.name}</h2>
                {excerpt && <p className="m-bp-excerpt">{excerpt}</p>}
                {post.tag_list?.length > 0 && (
                  <div className="m-bp-tags">
                    {post.tag_list.map((t: string) => (
                      <span key={t} className="m-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            );
          })
        )}
      </section>

      {totalPages > 1 && (
        <nav className="m-pagination" aria-label="Pagination">
          <button
            type="button"
            className="m-page-btn"
            disabled={safePage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ← Prev
          </button>
          <ol className="m-page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <li key={n}>
                <button
                  type="button"
                  className={`m-page-num${n === safePage ? " is-active" : ""}`}
                  aria-current={n === safePage ? "page" : "false"}
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              </li>
            ))}
          </ol>
          <button
            type="button"
            className="m-page-btn"
            disabled={safePage === totalPages || filtered.length === 0}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next →
          </button>
        </nav>
      )}

      {filtered.length > 0 && (
        <p className="m-results">
          Showing {from}–{to} of {filtered.length}
          {tag !== "all" ? ` in "${tag}"` : ""}
          {search.trim() ? ` for "${search.trim()}"` : ""}
        </p>
      )}
    </>
  );
}
