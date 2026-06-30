"use client";

import { useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

import {
  forceSimulation,
  forceManyBody,
  forceCenter,
  forceLink,
  forceCollide,
} from "d3-force";

type Props = {
  onCharacterSelect: (character: string, mentions: number) => void;
};

export default function RelationshipGraph({
  onCharacterSelect,
}: Props) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    fetch("/api/network")
      .then((r) => r.json())
      .then((data) => {
        const maxMentions = Math.max(
          ...data.nodes.map((n: any) => n.data.mentions)
        );

        const nodes: any[] = data.nodes.map((n: any) => {
          const mentions = n.data.mentions;

          const size = 40 + (mentions / maxMentions) * 55;

          return {
            ...n,
            x: Math.random() * 700,
            y: Math.random() * 700,

            style: {
              width: size,
              height: size,
              borderRadius: "50%",
              background: "#1f2937",
              border: "3px solid #d4af37",
              color: "white",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              cursor: "pointer",
            },
          };
        });

        const links = data.edges.map((e: any) => ({
          source: e.source,
          target: e.target,
        }));

        const simulation = forceSimulation(nodes)
          .force(
            "link",
            forceLink(links)
              .id((d: any) => d.id)
              .distance(120)
          )
          .force("charge", forceManyBody().strength(-450))
          .force("center", forceCenter(500, 350))
          .force(
            "collision",
            forceCollide().radius((d: any) => d.style.width)
          );

        simulation.tick(300);
        simulation.stop();

        const rfNodes: Node[] = nodes.map((n: any) => ({
          id: n.id,
          data: n.data,
          position: {
            x: n.x,
            y: n.y,
          },
          style: n.style,
        }));

        const rfEdges: Edge[] = data.edges.map((e: any, index: number) => ({
          id: `e${index}`,
          source: e.source,
          target: e.target,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
          style: {
            stroke: "#d4af37",
            strokeWidth: Math.max(e.strength / 20, 1.5),
          },
        }));

        setNodes(rfNodes);
        setEdges(rfEdges);
      });
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "720px",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        onNodeClick={(_, node) =>
          onCharacterSelect(
            node.id,
            (node.data as any).mentions
          )
        }
      >
        <MiniMap zoomable pannable />
        <Controls />
        <Background gap={24} />
      </ReactFlow>
    </div>
  );
}