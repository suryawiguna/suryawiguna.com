"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, X } from "lucide-react";
import { richTextToPlain as excerptText } from "lib/helper";
import PostCard from "./postCard";

// Divides evenly into the 3-, 2- and 1-column grid, so no page ends on a
// half-empty row.
const PER_PAGE = 12;

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
    let result =
      tag === "all"
        ? posts
        : posts.filter((p) => (p.tag_list || []).includes(tag));
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
  const from = filtered.length === 0 ? 0 : start + 1;
  const to = Math.min(start + PER_PAGE, filtered.length);

  // Every post is rendered; off-page ones are hidden rather than sliced away.
  // Pagination here is client-only state with no URL per page, so slicing left
  // all but the first five posts with no crawlable link anywhere on the site.
  const onCurrentPage = (index: number) =>
    index >= start && index < start + PER_PAGE;

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
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
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
            <ChevronDown
              className="m-icon m-filter-chevron"
              aria-hidden="true"
            />
          </button>
          {dropOpen && (
            <div
              className="m-filter-drop"
              role="listbox"
              aria-label="Filter by tag"
            >
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
                    onClick={() => {
                      setTagAndReset("all");
                      setDropOpen(false);
                    }}
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
                      onClick={() => {
                        setTagAndReset(t);
                        setDropOpen(false);
                      }}
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
        {filtered.length === 0 ? (
          <p className="m-empty">
            No posts found{tag !== "all" ? ` in "${tag}"` : ""}
            {search.trim() ? ` for "${search.trim()}"` : ""}.
          </p>
        ) : (
          filtered.map((post: any, index: number) => (
            <PostCard
              key={post.slug}
              post={post}
              hidden={!onCurrentPage(index)}
            />
          ))
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
            <ArrowLeft className="m-icon" aria-hidden="true" /> Prev
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
            Next <ArrowRight className="m-icon" aria-hidden="true" />
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
